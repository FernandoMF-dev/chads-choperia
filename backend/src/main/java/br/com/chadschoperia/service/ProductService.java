package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.Product;
import br.com.chadschoperia.domain.enums.HistoricProductActionEnum;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.ProductRepository;
import br.com.chadschoperia.service.dto.ProductDto;
import br.com.chadschoperia.service.dto.ProductStockDto;
import br.com.chadschoperia.service.events.AddHistoricProductEvent;
import br.com.chadschoperia.service.events.AddListHistoricProductEvent;
import br.com.chadschoperia.service.mapper.ProductMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

	private final ProductRepository repository;

	private final ProductMapper mapper;

	private final ApplicationEventPublisher applicationEventPublisher;

	public List<ProductDto> findAllDto() {
		return repository.findAllDto();
	}

	public ProductDto findDtoById(Long id) {
		return repository.findDtoById(id)
				.orElseThrow(() -> new EntityNotFoundException("product.not_found"));
	}

	public Product findEntityById(Long id) {
		return repository.findByIdAndDeletedIsFalse(id)
				.orElseThrow(() -> new EntityNotFoundException("product.not_found"));
	}

	public ProductDto create(ProductDto dto) {
		dto.setId(null);
		dto = saveDto(dto);

		publishHistoric(dto, HistoricProductActionEnum.CREATE);

		return dto;
	}

	public List<ProductDto> restock(List<ProductStockDto> dtos) {
		List<Long> productIds = dtos.stream().map(ProductStockDto::getProductId).collect(Collectors.toList());
		List<Product> products = repository.findAllById(productIds);
		List<Double> addedAmounts = new ArrayList<>();
		List<Double> totalAmounts = new ArrayList<>();

		products.forEach(product -> {
			double added = addStockFromSource(product, dtos);
			addedAmounts.add(added);
			totalAmounts.add(product.getStock());
		});
		publishListHistoric(HistoricProductActionEnum.RESTOCK, productIds, addedAmounts, totalAmounts);

		return mapper.toDto(saveEntity(products));
	}

	public ProductDto update(ProductDto dto) {
		findDtoById(dto.getId());
		dto = saveDto(dto);

		publishHistoric(dto, HistoricProductActionEnum.UPDATE);

		return dto;
	}

	public void deleteById(Long id) {
		Product entity = findEntityById(id);
		entity.setDeleted(Boolean.TRUE);
		publishHistoric(entity, HistoricProductActionEnum.DELETE);
		saveEntity(entity);
	}

	private double addStockFromSource(Product target, List<ProductStockDto> source) {
		ProductStockDto stockDto = source.stream()
				.filter(dto -> Objects.equals(dto.getProductId(), target.getId()))
				.findAny()
				.orElseThrow(() -> new EntityNotFoundException(HttpStatus.BAD_REQUEST, "product.not_found.restock"));

		double amount = stockDto.getAmount();
		target.addStock(stockDto.getAmount());
		return amount;
	}

	// <editor-fold defaultstate="collapsed" desc="Private Methods: Persist entity">
	private ProductDto saveDto(ProductDto dto) {
		return mapper.toDto(saveEntity(mapper.toEntity(dto)));
	}

	private Product saveEntity(Product entity) {
		return repository.save(entity);
	}

	private List<Product> saveEntity(List<Product> products) {
		return repository.saveAll(products);
	}
	// </editor-fold>

	// <editor-fold defaultstate="collapsed" desc="Private Methods: Publish events">
	private void publishHistoric(ProductDto productDto, HistoricProductActionEnum action) {
		this.publishHistoric(productDto, action, null);
	}

	private void publishHistoric(Product product, HistoricProductActionEnum action) {
		this.publishHistoric(product, action, null);
	}

	private void publishHistoric(ProductDto productDto, HistoricProductActionEnum action, Double stock) {
		applicationEventPublisher.publishEvent(new AddHistoricProductEvent(productDto.getId(), action, stock, productDto.getStock(), null));
	}

	private void publishHistoric(ProductDto productDto, HistoricProductActionEnum action, Double stock, String description) {
		applicationEventPublisher.publishEvent(new AddHistoricProductEvent(productDto.getId(), action, stock, productDto.getStock(), description));
	}

	private void publishHistoric(Product product, HistoricProductActionEnum action, Double stock) {
		applicationEventPublisher.publishEvent(new AddHistoricProductEvent(product.getId(), action, stock, product.getStock(), null));
	}

	private void publishListHistoric(HistoricProductActionEnum action, List<Long> beerIds, List<Double> stocks, List<Double> totalStocks) {
		List<String> descriptions = new ArrayList<>();

		for (int i = 0; i < beerIds.size(); i++) {
			descriptions.add(null);
		}

		applicationEventPublisher.publishEvent(new AddListHistoricProductEvent(action, beerIds, stocks, totalStocks, descriptions));
	}
	// </editor-fold>
}
