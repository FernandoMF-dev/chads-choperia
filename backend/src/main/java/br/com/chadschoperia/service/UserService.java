package br.com.chadschoperia.service;

import br.com.chadschoperia.configuration.security.UserDetailsServiceImpl;
import br.com.chadschoperia.domain.entities.User;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.UserRepository;
import br.com.chadschoperia.service.dto.UserDto;
import br.com.chadschoperia.service.dto.ViewUserDto;
import br.com.chadschoperia.service.mapper.UserMapper;
import br.com.chadschoperia.service.mapper.UserViewMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

	private final RoleService roleService;

	private final UserRepository repository;

	private final UserMapper mapper;

	private final UserViewMapper viewMapper;

	private final UserDetailsServiceImpl userDetailsService;

	public List<ViewUserDto> findAll() {
		return repository.findAllByDeletedIsFalse().stream().map(viewMapper::toDto).collect(Collectors.toList());
	}

	public UserDto findDtoById(Long id) {
		return mapper.toDto(findEntityById(id));
	}

	public UserDto findDtoByIdToEdit(Long id) {
		UserDto dto = findDtoById(id);
		dto.setPassword(null);
		return dto;
	}

	public User findEntityById(Long id) {
		return repository.findByIdAndDeletedIsFalse(id)
				.orElseThrow(() -> new EntityNotFoundException("user.not_found"));
	}

	public UserDto create(UserDto dto) {
		dto.setId(null);
		dto.setPassword(new BCryptPasswordEncoder().encode(dto.getPassword()));
		return saveDto(dto);
	}

	public UserDetails login(UserDto dto) {
		User user = repository.findByUsername(dto.getUsername())
				.orElseThrow(() -> new EntityNotFoundException("user.not_found"));
		if (new BCryptPasswordEncoder().matches(dto.getPassword(), user.getPassword())) {
			return userDetailsService.loadUserByUsername(dto.getUsername());
		} else {
			throw new EntityNotFoundException("user.invalid.credentials");
		}
	}

	public UserDto update(UserDto dto) {
		UserDto savedDto = findDtoById(dto.getId());
		dto.setPassword(savedDto.getPassword());
		return saveDto(dto);
	}

	public void deleteById(Long id) {
		User entity = findEntityById(id);
		entity.setDeleted(Boolean.TRUE);
		saveEntity(entity);
	}

	private void validateRoleExists(List<Long> idsRole) throws EntityNotFoundException {
		if (!roleService.existsRoleByIds(idsRole)) {
			throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, "role.not.found");

		}
	}

	private UserDto saveDto(UserDto dto) {
		validateRoleExists(dto.getIdsRole());
		return mapper.toDto(saveEntity(mapper.toEntity(dto)));
	}

	private User saveEntity(User entity) {
		return repository.save(entity);
	}

}
