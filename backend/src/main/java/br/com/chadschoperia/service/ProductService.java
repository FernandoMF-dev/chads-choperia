package br.com.chadschoperia.service;

import br.com.chadschoperia.repository.ProductRepository;
import br.com.chadschoperia.service.dto.ProductDto;
import br.com.chadschoperia.service.exception.EntityNotFoundException;
import br.com.chadschoperia.service.mapper.ProductMapper;
import br.com.chadschoperia.util.MessageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

	private final ProductRepository repository;

	private final ProductMapper mapper;

	public List<ProductDto> findAll() {
		return mapper.toDto(repository.findAll());
	}

	public ProductDto findById(Long id) {
		return mapper.toDto(repository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException(MessageUtil.USER_NOT_FOUND)));
	}

	private void existsById(Long id) {
		if (!repository.existsById(id)) {
			throw new EntityNotFoundException(MessageUtil.USER_NOT_FOUND);
		}
	}

	public ProductDto create(ProductDto dto) {
		return mapper.toDto(repository.save(mapper.toEntity(dto)));
	}

	public List<ProductDto> updateBatch(List<ProductDto> dtos) {
		return mapper.toDto(repository.saveAll(mapper.toEntity(dtos)));
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
