package br.com.chadschoperia.controller;

import br.com.chadschoperia.configuration.security.RolesUtil;
import br.com.chadschoperia.service.ProductService;
import br.com.chadschoperia.service.dto.ProductDto;
import br.com.chadschoperia.service.dto.ProductStockDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/produto")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequiredArgsConstructor
public class ProductController {

	private final ProductService service;

	@GetMapping
	@Secured({RolesUtil.ADMIN, RolesUtil.COOK, RolesUtil.STOCK_MONITOR})
	public ResponseEntity<List<ProductDto>> findAll() {
		return ResponseEntity.ok(service.findAllDto());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ProductDto> findById(@PathVariable Long id) {
		return ResponseEntity.ok(service.findDtoById(id));
	}

	@PostMapping
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<ProductDto> create(@Valid @RequestBody ProductDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
	}

	@PostMapping("/restock")
	@Secured({RolesUtil.STOCK_MONITOR})
	public ResponseEntity<List<ProductDto>> restock(@RequestBody List<ProductStockDto> dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.restock(dto, true));
	}

	@PostMapping("/unstock")
	@Secured({RolesUtil.COOK})
	public ResponseEntity<List<ProductDto>> unstock(@RequestBody List<ProductStockDto> dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.restock(dto, false));
	}

	@PutMapping
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<ProductDto> update(@Valid @RequestBody ProductDto dto) {
		return ResponseEntity.ok(service.update(dto));
	}

	@DeleteMapping("/{id}")
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		service.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
