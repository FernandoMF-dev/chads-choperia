package br.com.chadschoperia.controller;

import br.com.chadschoperia.service.RoleService;
import br.com.chadschoperia.service.dto.DropdownDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/funcao")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class RoleController {

	private final RoleService roleService;

	@GetMapping
	public ResponseEntity<List<DropdownDto>> findAll() {
		return ResponseEntity.ok(roleService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<DropdownDto> findById(@PathVariable Long id) {
		return ResponseEntity.ok(roleService.findById(id));
	}

}
