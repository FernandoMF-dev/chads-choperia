package br.com.chadschoperia.controller;

import br.com.chadschoperia.service.ClientCardService;
import br.com.chadschoperia.service.dto.ClientCardDto;
import br.com.chadschoperia.service.dto.ClientCardLinkDto;
import br.com.chadschoperia.service.dto.ClientCardPaymentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/card/client")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class ClientCardController {

	private final ClientCardService clientCardService;

	@GetMapping("/rfid/{rfid}")
	public ResponseEntity<ClientCardDto> findOpenByRfid(@PathVariable String rfid) {
		return ResponseEntity.ok(clientCardService.findOpenByRfid(rfid));
	}

	@PostMapping()
	public ResponseEntity<ClientCardDto> linkCardToCustomer(@RequestBody ClientCardLinkDto link) {
		return ResponseEntity.status(HttpStatus.CREATED).body(clientCardService.linkCardToCustomer(link));
	}

	@PatchMapping("/pagamento")
	public ResponseEntity<ClientCardDto> completePayment(@RequestBody ClientCardPaymentDto payment) {
		return ResponseEntity.ok(clientCardService.completePayment(payment));
	}

}
