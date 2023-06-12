package br.com.chadschoperia.controller;

import br.com.chadschoperia.configuration.security.RolesUtil;
import br.com.chadschoperia.service.SelfserviceService;
import br.com.chadschoperia.service.dto.FoodWeighingDto;
import br.com.chadschoperia.service.dto.SelfserviceSettingsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/self-service")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequiredArgsConstructor
public class SelfserviceController {

	private final SelfserviceService service;

	@PostMapping("/purchase")
	public ResponseEntity<FoodWeighingDto> createPurchase(@RequestBody FoodWeighingDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.insertExpense(dto));
	}

	@PutMapping("/settings")
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<SelfserviceSettingsDto> changeSettings(@RequestBody SelfserviceSettingsDto dto) {
		return ResponseEntity.status(HttpStatus.OK).body(service.insertNewSettings(dto));
	}

	@GetMapping("/settings")
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<SelfserviceSettingsDto> getCurrentSetting() {
		return ResponseEntity.status(HttpStatus.OK).body(service.getCurrentSettings());
	}

}
