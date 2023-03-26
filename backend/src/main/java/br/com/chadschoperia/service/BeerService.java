package br.com.chadschoperia.service;

import br.com.chadschoperia.repository.BeerRepository;
import br.com.chadschoperia.service.dto.BeerDto;
import br.com.chadschoperia.service.dto.ViewBeerDto;
import br.com.chadschoperia.service.exception.BusinessException;
import br.com.chadschoperia.service.exception.EntityNotFoundException;
import br.com.chadschoperia.service.mapper.BeerMapper;
import br.com.chadschoperia.service.mapper.ViewBeerMapper;
import br.com.chadschoperia.util.MessageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BeerService {

	private final BeerRepository beerRepository;

	private final BeerMapper beerMapper;

	private final ViewBeerMapper viewBeerMapper;

	public List<ViewBeerDto> findAll() {
		return viewBeerMapper.toDto(beerRepository.findAll());
	}

	public BeerDto findById(Long idBeer) {
		return beerMapper.toDto(beerRepository.findById(idBeer)
				.orElseThrow(() -> new EntityNotFoundException(MessageUtil.BEER_NOT_FOUND)));
	}

	private void existsById(Long idBeer) {
		if (!beerRepository.existsById(idBeer)) {
			throw new EntityNotFoundException(MessageUtil.BEER_NOT_FOUND);
		}
	}

	private void validatePrices(BeerDto beerDto) {
		if (beerDto.getPurchasePrice() <= 0L) {
			throw new BusinessException(MessageUtil.BUSINESS_EXCEPTION_PURCHASE_VALUE_EQUAL_TO_OR_LESS_THAN_ZERO);
		}

		if (beerDto.getValuePerMug() <= 0L) {
			throw new BusinessException(MessageUtil.BUSINESS_EXCEPTION_MUG_VALUE_EQUAL_TO_OR_LESS_THAN_ZERO);
		}

		if (beerDto.getValuePerMug() < beerDto.getPurchasePrice()) {
			throw new BusinessException(MessageUtil.BUSINESS_EXCEPTION_MUG_VALUE_LESS_THAN_PURCHASE_PRICE);
		}
	}

	public BeerDto create(BeerDto beerDto) {
		validatePrices(beerDto);
		beerDto.setStock(0L);
		return beerMapper.toDto(beerRepository.save(beerMapper.toEntity(beerDto)));
	}

	public BeerDto update(BeerDto beerDto) {
		existsById(beerDto.getId());
		validatePrices(beerDto);
		beerDto.setStock(beerRepository.findStockById(beerDto.getId()));
		return beerMapper.toDto(beerRepository.save(beerMapper.toEntity(beerDto)));
	}

	public void deleteById(Long idBeer) {
		existsById(idBeer);
		beerRepository.deleteById(idBeer);
	}

}