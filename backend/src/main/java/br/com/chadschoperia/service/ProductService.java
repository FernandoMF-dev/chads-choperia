package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.Product;
import br.com.chadschoperia.repository.ProductRepository;
import br.com.chadschoperia.service.dto.ProductDto;
import br.com.chadschoperia.service.dto.ProductStockDto;
import br.com.chadschoperia.service.exception.EntityNotFoundException;
import br.com.chadschoperia.service.mapper.ProductMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductService {

	private final ProductRepository repository;

	private final ProductMapper mapper;

	public List<ProductDto> findAll() {
		return mapper.toDto(repository.findAll());
	}

	public ProductDto findById(Long id) {
		return mapper.toDto(repository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("user.not_found")));
	}

	private void existsById(Long id) {
		if (!repository.existsById(id)) {
			throw new EntityNotFoundException("user.not_found");
		}
	}

	public ProductDto create(ProductDto dto) {
		return mapper.toDto(repository.save(mapper.toEntity(dto)));
	}

	public List<ProductDto> restock(List<ProductStockDto> dtos) {
		List<Product> products = repository.findAllById(dtos.stream().map(ProductStockDto::getProductId).collect(Collectors.toList()));
		products.forEach(product -> {
			product.setStock(product.getStock() + dtos.stream()
					.filter(dto -> dto.getProductId().equals(product.getId())).findAny().orElse(null).getAmount());
		});

		return mapper.toDto(repository.saveAll(products));
	}

	public ProductDto update(ProductDto dto) {
		existsById(dto.getId());
		return mapper.toDto(repository.save(mapper.toEntity(dto)));
	}

	public void deleteById(Long id) {
		existsById(id);
		repository.deleteById(id);
	}

}
