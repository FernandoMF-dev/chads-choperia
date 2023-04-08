package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.Beer;
import br.com.chadschoperia.exceptions.BusinessException;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.BeerRepository;
import br.com.chadschoperia.service.dto.BeerDto;
import br.com.chadschoperia.service.dto.PourBeerDTO;
import br.com.chadschoperia.service.dto.ProductStockDto;
import br.com.chadschoperia.service.dto.ViewBeerDto;
import br.com.chadschoperia.service.mapper.BeerMapper;
import br.com.chadschoperia.service.mapper.ViewBeerMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
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

	private final ViewBeerMapper viewBeerMapper;

	public List<ViewBeerDto> findAll() {
		return viewBeerMapper.toDto(beerRepository.findAll());
	}

	public List<BeerDto> findAllComplete() {
		return beerMapper.toDto(beerRepository.findAll());
	}

	public BeerDto findById(Long idBeer) {
		return beerMapper.toDto(beerRepository.findById(idBeer)
				.orElseThrow(() -> new EntityNotFoundException("beer.not_found")));
	}

	private void existsById(Long idBeer) {
		if (!beerRepository.existsById(idBeer)) {
			throw new EntityNotFoundException("beer.not_found");
		}
	}

	private void validatePrices(BeerDto beerDto) {
		if (beerDto.getValuePerMug() < beerDto.getPurchasePrice()) {
			throw new BusinessException("beer.mug.less_than.purchase_price");
		}
	}

	public BeerDto create(BeerDto beerDto) {
		validatePrices(beerDto);
		beerDto.setStock(0D);
		return beerMapper.toDto(beerRepository.save(beerMapper.toEntity(beerDto)));
	}

	public BeerDto update(BeerDto beerDto) {
		existsById(beerDto.getId());
		validatePrices(beerDto);
		beerDto.setStock(beerRepository.findStockById(beerDto.getId()));
		return beerMapper.toDto(beerRepository.save(beerMapper.toEntity(beerDto)));
	}

	public List<BeerDto> restock(List<ProductStockDto> dtos) {
		List<Long> productIds = dtos.stream().map(ProductStockDto::getProductId).collect(Collectors.toList());
		List<Beer> beers = beerRepository.findAllById(productIds);
		beers.forEach(product -> {
			Optional<ProductStockDto> stockDto = dtos.stream().filter(dto -> dto.getProductId().equals(product.getId())).findAny();
			if (stockDto.isEmpty()) {
				throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, "beer.not_found.restock");
			}
			product.addStock(stockDto.get().getAmount() * STOCK_BASE_MULTIPLIER);
		});

		return beerMapper.toDto(beerRepository.saveAll(beers));
	}

	public void pour(PourBeerDTO dto) {
		//TODO : when client_card gets implemented, do handle relation between pour and bill
		BeerDto beer = findById(dto.getBeer());
		beer.subtractStock(POUR_QUANTITY);
		beerRepository.save(beerMapper.toEntity(beer));
	}

	public void deleteById(Long idBeer) {
		existsById(idBeer);
		beerRepository.deleteById(idBeer);
	}

}
