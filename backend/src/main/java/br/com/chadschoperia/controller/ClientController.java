package br.com.chadschoperia.controller;

import br.com.chadschoperia.configuration.security.RolesUtil;
import br.com.chadschoperia.service.ClientService;
import br.com.chadschoperia.service.dto.ClientDto;
import br.com.chadschoperia.service.dto.ViewClientDto;
import br.com.chadschoperia.service.dto.filters.ViewClientFilterDto;
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
@RequestMapping("/api/cliente")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequiredArgsConstructor
public class ClientController {

	private final ClientService clientService;

	@GetMapping
	@Secured({RolesUtil.COSTUMER_MONITOR, RolesUtil.ADMIN})
	public ResponseEntity<List<ViewClientDto>> findAll(ViewClientFilterDto filter) {
		return ResponseEntity.ok(clientService.findAllView(filter));
	}

	@GetMapping("/{idClient}")
	@Secured({RolesUtil.COSTUMER_MONITOR, RolesUtil.ADMIN})
	public ResponseEntity<ClientDto> findById(@PathVariable Long idClient) {
		return ResponseEntity.ok(clientService.findDtoById(idClient));
	}

	@PostMapping
	@Secured({RolesUtil.COSTUMER_MONITOR, RolesUtil.ADMIN})
	public ResponseEntity<ClientDto> create(@Valid @RequestBody ClientDto clientDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(clientService.create(clientDto));
	}

	@PutMapping
	@Secured({RolesUtil.COSTUMER_MONITOR, RolesUtil.ADMIN})
	public ResponseEntity<ClientDto> update(@Valid @RequestBody ClientDto clientDto) {
		return ResponseEntity.ok(clientService.update(clientDto));
	}

	@DeleteMapping("/{idClient}")
	@Secured({RolesUtil.COSTUMER_MONITOR, RolesUtil.ADMIN})
	public ResponseEntity<Void> deleteById(@PathVariable Long idClient) {
		clientService.deleteById(idClient);
		return ResponseEntity.noContent().build();
	}

}
