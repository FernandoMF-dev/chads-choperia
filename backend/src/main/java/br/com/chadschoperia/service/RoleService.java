package br.com.chadschoperia.service;

import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.RoleRepository;
import br.com.chadschoperia.service.dto.DropdownDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RoleService {

	private final RoleRepository repository;

	public List<DropdownDto> findAllDropdown() {
		return repository.findAllDropdown();
	}

	public DropdownDto findById(Long id) {
		return repository.findDropdownById(id)
				.orElseThrow(() -> new EntityNotFoundException("role.not_found"));
	}

}
