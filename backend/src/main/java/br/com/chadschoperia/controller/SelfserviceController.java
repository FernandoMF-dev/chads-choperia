package br.com.chadschoperia.controller;

import br.com.chadschoperia.service.SelfserviceService;
import br.com.chadschoperia.service.dto.FoodWeighingDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/self-service")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class SelfserviceController {

	private final SelfserviceService service;

	@PostMapping("/purchase")
	public ResponseEntity<FoodWeighingDto> createPurchase(@RequestBody FoodWeighingDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.insertExpense(dto));
	}

	@PutMapping("/settings")
	public ResponseEntity<Void> changeSettings(@RequestBody Double pricePerKg) {
		service.insertNewSettings(pricePerKg);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@GetMapping("/settings")
	public ResponseEntity<Double> getCurrentSetting() {
		return ResponseEntity.status(HttpStatus.OK).body(service.getCurrentSettings().getPricePerKg());
	}

}
