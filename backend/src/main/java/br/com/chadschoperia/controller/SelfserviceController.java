package br.com.chadschoperia.controller;

import br.com.chadschoperia.service.SelfserviceService;
import br.com.chadschoperia.service.dto.SelfServiceDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/self-service")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class SelfserviceController {

	private final SelfserviceService service;

	@PostMapping
	public ResponseEntity<SelfServiceDto> create(@RequestBody SelfServiceDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.insertExpense(dto));
	}

	@PatchMapping()
	public ResponseEntity<Void> insert(@RequestBody Double pricePerKg) {
		service.insertPricePerKg(pricePerKg);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@GetMapping("/get-price-per-kg")
	public ResponseEntity<Double> getPricePerKg() {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.getPricePerKg());
	}

}
