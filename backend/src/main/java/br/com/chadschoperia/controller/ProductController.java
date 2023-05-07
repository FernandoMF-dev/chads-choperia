package br.com.chadschoperia.controller;

import br.com.chadschoperia.service.ProductService;
import br.com.chadschoperia.service.dto.ProductDto;
import br.com.chadschoperia.service.dto.ProductStockDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/produto")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class ProductController {

	private final ProductService service;

	@GetMapping
	public ResponseEntity<List<ProductDto>> findAll() {
		return ResponseEntity.ok(service.findAllDto());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ProductDto> findById(@PathVariable Long id) {
		return ResponseEntity.ok(service.findDtoById(id));
	}

	@PostMapping
	public ResponseEntity<ProductDto> create(@Valid @RequestBody ProductDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
	}

	@PostMapping("/restock")
	public ResponseEntity<List<ProductDto>> restock(@RequestBody List<ProductStockDto> dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.restock(dto, true));
	}

	@PostMapping("/unstock")
	public ResponseEntity<List<ProductDto>> unstock(@RequestBody List<ProductStockDto> dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.restock(dto, false));
	}

	@PutMapping
	public ResponseEntity<ProductDto> update(@Valid @RequestBody ProductDto dto) {
		return ResponseEntity.ok(service.update(dto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		service.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
