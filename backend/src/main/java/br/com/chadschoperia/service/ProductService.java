package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.Product;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.ProductRepository;
import br.com.chadschoperia.service.dto.ProductDto;
import br.com.chadschoperia.service.dto.ProductStockDto;
import br.com.chadschoperia.service.mapper.ProductMapper;
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
public class ProductService {

	private final ProductRepository repository;

	private final ProductMapper mapper;

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
		return saveDto(dto);
	}

	public List<ProductDto> restock(List<ProductStockDto> dtos) {
		List<Product> products = repository.findAllById(dtos.stream().map(ProductStockDto::getProductId).collect(Collectors.toList()));

		products.forEach(product -> addStockFromSource(product, dtos));

		return mapper.toDto(saveEntity(products));
	}

	public ProductDto update(ProductDto dto) {
		findDtoById(dto.getId());
		return saveDto(dto);
	}

	public void deleteById(Long id) {
		Product entity = findEntityById(id);
		entity.setDeleted(Boolean.TRUE);
		saveEntity(entity);
	}

	private void addStockFromSource(Product target, List<ProductStockDto> source) {
		Optional<ProductStockDto> stockDto = source.stream().filter(dto -> dto.getProductId().equals(target.getId())).findAny();
		if (stockDto.isEmpty()) {
			throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, "product.not_found.restock");
		}
		target.addStock(stockDto.get().getAmount());
	}

	private ProductDto saveDto(ProductDto dto) {
		return mapper.toDto(saveEntity(mapper.toEntity(dto)));
	}

	private Product saveEntity(Product entity) {
		return repository.save(entity);
	}

	private List<Product> saveEntity(List<Product> products) {
		return repository.saveAll(products);
	}

}
