package br.com.chadschoperia.controller;

import br.com.chadschoperia.service.ClientCardService;
import br.com.chadschoperia.service.dto.ClientCardDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/card/client")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class ClientCardController {

	private final ClientCardService clientCardService;

	@GetMapping("/rfid/{rfid}")
	public ResponseEntity<ClientCardDto> findById(@PathVariable Long rfid) {
		return ResponseEntity.ok(clientCardService.findOpenByRfid(rfid));
	}

}
