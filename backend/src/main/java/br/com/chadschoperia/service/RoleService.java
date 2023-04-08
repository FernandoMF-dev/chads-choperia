package br.com.chadschoperia.service;

import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.RoleRepository;
import br.com.chadschoperia.service.dto.DropdownDto;
import br.com.chadschoperia.service.mapper.RoleMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RoleService {

	private final RoleRepository repository;

	private final RoleMapper roleMapper;

	public List<DropdownDto> findAll() {
		return roleMapper.toDto(repository.findAll());
	}

	public DropdownDto findById(Long id) {
		return roleMapper.toDto(repository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("role.not_found")));
	}

	public void existsById(Long id) {
		if (!repository.existsById(id)) {
			throw new EntityNotFoundException("role.not_found");
		}
	}

}
