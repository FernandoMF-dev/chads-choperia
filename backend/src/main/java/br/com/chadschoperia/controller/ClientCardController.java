package br.com.chadschoperia.controller;

import br.com.chadschoperia.configuration.security.RolesUtil;
import br.com.chadschoperia.service.ClientCardService;
import br.com.chadschoperia.service.dto.ClientCardDto;
import br.com.chadschoperia.service.dto.ClientCardLinkDto;
import br.com.chadschoperia.service.dto.ClientCardPaymentDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/card/client")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequiredArgsConstructor
public class ClientCardController {

	private final ClientCardService clientCardService;

	@GetMapping("/rfid/{rfid}")
	public ResponseEntity<ClientCardDto> findOpenByRfid(@PathVariable String rfid, @RequestParam(required = false) boolean paid) {
		if (paid) {
			return ResponseEntity.ok(clientCardService.findPaidByRfid(rfid));
		}
		return ResponseEntity.ok(clientCardService.findOpenByRfid(rfid));
	}

	@PostMapping()
	@Secured({RolesUtil.COSTUMER_MONITOR})
	public ResponseEntity<ClientCardDto> linkCardToCustomer(@RequestBody ClientCardLinkDto link) {
		return ResponseEntity.status(HttpStatus.CREATED).body(clientCardService.linkCardToCustomer(link));
	}

	@PatchMapping("/pagamento")
	@Secured({RolesUtil.CASHIER})
	public ResponseEntity<ClientCardDto> completePayment(@RequestBody ClientCardPaymentDto payment) {
		return ResponseEntity.ok(clientCardService.completePayment(payment));
	}

	@DeleteMapping("/rfid/{rfid}")
	@Secured({RolesUtil.COSTUMER_MONITOR})
	public ResponseEntity<Void> unlinkCardFromCustomer(@PathVariable String rfid) {
		clientCardService.unlinkCardFromCustomer(rfid);
		return ResponseEntity.noContent().build();
	}
}
