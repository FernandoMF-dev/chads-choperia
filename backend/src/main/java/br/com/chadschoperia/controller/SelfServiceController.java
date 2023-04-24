package br.com.chadschoperia.controller;

import br.com.chadschoperia.service.BeerService;
import br.com.chadschoperia.service.SelfServiceService;
import br.com.chadschoperia.service.dto.BeerDto;
import br.com.chadschoperia.service.dto.PourBeerDTO;
import br.com.chadschoperia.service.dto.ProductStockDto;
import br.com.chadschoperia.service.dto.SelfServiceDto;
import br.com.chadschoperia.service.dto.ViewBeerDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/self-service")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class SelfServiceController {

	private final SelfServiceService service;

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
