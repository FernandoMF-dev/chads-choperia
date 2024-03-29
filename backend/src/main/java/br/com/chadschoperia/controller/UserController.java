package br.com.chadschoperia.controller;

import br.com.chadschoperia.configuration.security.RolesUtil;
import br.com.chadschoperia.service.UserService;
import br.com.chadschoperia.service.dto.UserDto;
import br.com.chadschoperia.service.dto.ViewUserDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.userdetails.UserDetails;
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
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequiredArgsConstructor
public class UserController {

	private final UserService service;

	@GetMapping
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<List<ViewUserDto>> findAll() {
		return ResponseEntity.ok(service.findAll());
	}

	@GetMapping("/{id}")
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<UserDto> findById(@PathVariable Long id) {
		return ResponseEntity.ok(service.findDtoByIdToEdit(id));
	}

	@PostMapping
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<UserDto> create(@Valid @RequestBody UserDto dto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(service.create(dto));
	}

	@PostMapping("/login")
	public ResponseEntity<UserDetails> login(@RequestBody UserDto dto) {
		return ResponseEntity.status(HttpStatus.OK).body(service.login(dto));
	}

	@PutMapping
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<UserDto> update(@Valid @RequestBody UserDto dto) {
		return ResponseEntity.ok(service.update(dto));
	}

	@DeleteMapping("/{id}")
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<Void> deleteById(@PathVariable Long id) {
		service.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
