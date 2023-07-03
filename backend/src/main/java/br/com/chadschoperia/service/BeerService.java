package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.Beer;
import br.com.chadschoperia.domain.enums.HistoricProductActionEnum;
import br.com.chadschoperia.domain.enums.SellingPointEnum;
import br.com.chadschoperia.exceptions.BusinessException;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.BeerRepository;
import br.com.chadschoperia.service.dto.BeerDto;
import br.com.chadschoperia.service.dto.ClientCardDto;
import br.com.chadschoperia.service.dto.PourBeerDTO;
import br.com.chadschoperia.service.dto.ProductStockDto;
import br.com.chadschoperia.service.dto.ViewBeerDto;
import br.com.chadschoperia.service.dto.filters.ViewBeerFilterDto;
import br.com.chadschoperia.service.events.AddClientCardExpenseEvent;
import br.com.chadschoperia.service.events.AddHistoricBeerEvent;
import br.com.chadschoperia.service.events.AddListHistoricBeerEvent;
import br.com.chadschoperia.service.events.AddListRevenueExpenseEvent;
import br.com.chadschoperia.service.mapper.BeerMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class BeerService {
	public static final double STOCK_BASE_MULTIPLIER = 100.0;
	public static final double POUR_QUANTITY = 0.5;

	private final BeerRepository beerRepository;

	private final BeerMapper beerMapper;

	private final ClientCardService clientCardService;

	private final MessageSource messageSource;
	private final MessageSource historicMessageSource;
	private final ApplicationEventPublisher applicationEventPublisher;

	public List<ViewBeerDto> findAllView() {
		return beerRepository.findAllView();
	}

	public List<BeerDto> findAllDto(ViewBeerFilterDto filter) {
		return beerRepository.findAllDto(filter);
	}

	public BeerDto findDtoById(Long idBeer) {
		return beerRepository.findDtoById(idBeer)
				.orElseThrow(() -> new EntityNotFoundException("beer.not_found"));
	}

	public Beer findEntityById(Long idBeer) {
		return beerRepository.findByIdAndDeletedIsFalse(idBeer)
				.orElseThrow(() -> new EntityNotFoundException("beer.not_found"));
	}

	private void validatePrices(BeerDto beerDto) {
		if (beerDto.getValuePerMug() < beerDto.getPurchasePrice()) {
			throw new BusinessException("beer.mug.less_than.purchase_price");
		}
	}

	public BeerDto create(BeerDto beerDto) {
		validatePrices(beerDto);

		beerDto.setId(null);
		beerDto.setStock(0D);
		beerDto = saveDto(beerDto);

		publishHistoric(beerDto, HistoricProductActionEnum.CREATE);

		return beerDto;
	}

	public BeerDto update(BeerDto beerDto) {
		validatePrices(beerDto);

		BeerDto originalDto = findDtoById(beerDto.getId());
		beerDto.setStock(originalDto.getStock());
		beerDto = saveDto(beerDto);

		publishHistoric(beerDto, HistoricProductActionEnum.UPDATE);

		return beerDto;
	}

	public List<BeerDto> restock(List<ProductStockDto> dtos) {
		List<Long> productIds = dtos.stream().map(ProductStockDto::getProductId).toList();
		List<Beer> beers = beerRepository.findAllById(productIds);
		List<Double> expensesValues = new ArrayList<>();
		List<String> expensesDescs = new ArrayList<>();
		List<Double> addedAmounts = new ArrayList<>();
		List<Double> totalAmounts = new ArrayList<>();

		beers.forEach(beer -> {
			double added = addStockFromSource(beer, dtos);
			addedAmounts.add(added);
			totalAmounts.add(beer.getStock());
			expensesValues.add(-beer.getTotalPurchasePrice(added));
			expensesDescs.add(historicMessageSource.getMessage("revenue.beer.restock", new String[]{String.format("%01.1f", added), beer.getName()}, Locale.getDefault()));
		});
		publishListHistoric(HistoricProductActionEnum.RESTOCK, productIds, addedAmounts, totalAmounts);
		publishRevenueExpense(expensesValues, expensesDescs);

		return beerMapper.toDto(saveEntity(beers));
	}

	public void pour(PourBeerDTO dto) {
		BeerDto beer = findDtoById(dto.getBeer());
		ClientCardDto card = clientCardService.findOpenByRfid(dto.getCard());
		String historicDesc = historicMessageSource.getMessage(HistoricProductActionEnum.POUR.getMessage(), new String[]{card.getClient().getName(), card.getRfid()}, Locale.getDefault());

		publishPourExpense(card, beer);
		beer.subtractStock(POUR_QUANTITY);
		publishHistoric(beer, HistoricProductActionEnum.POUR, -POUR_QUANTITY, historicDesc);
		saveDto(beer);
	}

	public void deleteById(Long idBeer) {
		Beer entity = findEntityById(idBeer);
		entity.setDeleted(Boolean.TRUE);
		publishHistoric(entity, HistoricProductActionEnum.DELETE);
		saveEntity(entity);
	}

	private double addStockFromSource(Beer target, List<ProductStockDto> source) {
		ProductStockDto stockDto = source.stream()
				.filter(dto -> Objects.equals(dto.getProductId(), target.getId()))
				.findAny()
				.orElseThrow(() -> new EntityNotFoundException(HttpStatus.BAD_REQUEST, "beer.not_found.restock"));

		double amount = stockDto.getAmount() * STOCK_BASE_MULTIPLIER;
		target.addStock(amount);
		return amount;
	}

	// <editor-fold defaultstate="collapsed" desc="Private Methods: Persist entity">
	private BeerDto saveDto(BeerDto beer) {
		return beerMapper.toDto(saveEntity(beerMapper.toEntity(beer)));
	}

	private Beer saveEntity(Beer entity) {
		return beerRepository.save(entity);
	}

	private List<Beer> saveEntity(List<Beer> beers) {
		return beerRepository.saveAll(beers);
	}
	// </editor-fold>

	// <editor-fold defaultstate="collapsed" desc="Private Methods: Publish events">
	private void publishPourExpense(ClientCardDto card, BeerDto beer) {
		try {
			String description = messageSource.getMessage("client_card_expense.beer.pour", new String[]{beer.getName()}, Locale.getDefault());
			applicationEventPublisher.publishEvent(new AddClientCardExpenseEvent(card.getId(), beer.getValuePerMug(), description, SellingPointEnum.BEER));
		} catch (EntityNotFoundException ex) {
			throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, ex.getReason());
		}
	}

	private void publishRevenueExpense(List<Double> values, List<String> descriptions) {
		applicationEventPublisher.publishEvent(new AddListRevenueExpenseEvent(values, descriptions, SellingPointEnum.BEER));
	}

	private void publishHistoric(BeerDto beerDto, HistoricProductActionEnum action) {
		this.publishHistoric(beerDto, action, null);
	}

	private void publishHistoric(Beer beer, HistoricProductActionEnum action) {
		this.publishHistoric(beer, action, null);
	}

	private void publishHistoric(BeerDto beerDto, HistoricProductActionEnum action, Double stock) {
		applicationEventPublisher.publishEvent(new AddHistoricBeerEvent(beerDto.getId(), action, stock, beerDto.getStock(), null));
	}

	private void publishHistoric(BeerDto beerDto, HistoricProductActionEnum action, Double stock, String description) {
		applicationEventPublisher.publishEvent(new AddHistoricBeerEvent(beerDto.getId(), action, stock, beerDto.getStock(), description));
	}

	private void publishHistoric(Beer beer, HistoricProductActionEnum action, Double stock) {
		applicationEventPublisher.publishEvent(new AddHistoricBeerEvent(beer.getId(), action, stock, beer.getStock(), null));
	}

	private void publishListHistoric(HistoricProductActionEnum action, List<Long> beerIds, List<Double> stocks, List<Double> totalStocks) {
		List<String> descriptions = new ArrayList<>();

		for (int i = 0; i < beerIds.size(); i++) {
			descriptions.add(null);
		}

		applicationEventPublisher.publishEvent(new AddListHistoricBeerEvent(action, beerIds, stocks, totalStocks, descriptions));
	}
	// </editor-fold>
}
