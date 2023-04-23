package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.Beer;
import br.com.chadschoperia.exceptions.BusinessException;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.BeerRepository;
import br.com.chadschoperia.service.dto.BeerDto;
import br.com.chadschoperia.service.dto.ClientCardDto;
import br.com.chadschoperia.service.dto.PourBeerDTO;
import br.com.chadschoperia.service.dto.ProductStockDto;
import br.com.chadschoperia.service.dto.ViewBeerDto;
import br.com.chadschoperia.service.events.AddClientCardExpenseEvent;
import br.com.chadschoperia.service.mapper.BeerMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

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
	private final ApplicationEventPublisher applicationEventPublisher;

	public List<ViewBeerDto> findAllView() {
		return beerRepository.findAllView();
	}

	public List<BeerDto> findAllDto() {
		return beerRepository.findAllDto();
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
		return saveDto(beerDto);
	}

	public BeerDto update(BeerDto beerDto) {
		BeerDto originalDto = findDtoById(beerDto.getId());
		validatePrices(beerDto);
		beerDto.setStock(originalDto.getStock());
		return saveDto(beerDto);
	}

	public List<BeerDto> restock(List<ProductStockDto> dtos) {
		List<Long> productIds = dtos.stream().map(ProductStockDto::getProductId).collect(Collectors.toList());
		List<Beer> beers = beerRepository.findAllById(productIds);

		beers.forEach(product -> addStockFromSource(product, dtos));

		return saveDto(beers);
	}


	public void pour(PourBeerDTO dto) {
		BeerDto beer = findDtoById(dto.getBeer());
		publishPourExpense(dto, beer);
		beer.subtractStock(POUR_QUANTITY);
		saveDto(beer);
	}

	public void deleteById(Long idBeer) {
		Beer entity = findEntityById(idBeer);
		entity.setDeleted(Boolean.TRUE);
		saveEntity(entity);
	}

	private void addStockFromSource(Beer target, List<ProductStockDto> source) {
		Optional<ProductStockDto> stockDto = source.stream().filter(dto -> dto.getProductId().equals(target.getId())).findAny();
		if (stockDto.isEmpty()) {
			throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, "beer.not_found.restock");
		}
		target.addStock(stockDto.get().getAmount() * STOCK_BASE_MULTIPLIER);
	}

	private void publishPourExpense(PourBeerDTO dto, BeerDto beer) {
		try {
			ClientCardDto card = clientCardService.findOpenByRfid(dto.getCard());
			String description = messageSource.getMessage("client_card_expense.beer.pour", new String[]{beer.getName()}, Locale.getDefault());
			applicationEventPublisher.publishEvent(new AddClientCardExpenseEvent(card.getId(), beer.getValuePerMug(), description));
		} catch (EntityNotFoundException ex) {
			throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, ex.getReason());
		}
	}

	private BeerDto saveDto(BeerDto beer) {
		return beerMapper.toDto(saveEntity(beerMapper.toEntity(beer)));
	}

	private List<BeerDto> saveDto(List<Beer> beers) {
		return beerMapper.toDto(saveEntity(beers));
	}

	private Beer saveEntity(Beer entity) {
		return beerRepository.save(entity);
	}

	private List<Beer> saveEntity(List<Beer> beers) {
		return beerRepository.saveAll(beers);
	}
}
