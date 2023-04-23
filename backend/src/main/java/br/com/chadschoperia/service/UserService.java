package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.User;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.UserRepository;
import br.com.chadschoperia.service.dto.UserDto;
import br.com.chadschoperia.service.dto.ViewUserDto;
import br.com.chadschoperia.service.mapper.UserMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {

	private final RoleService roleService;

	private final UserRepository repository;

	private final UserMapper mapper;

	public List<ViewUserDto> findAll() {
		return repository.findAllView();
	}

	public UserDto findDtoById(Long id) {
		return repository.findDtoById(id)
				.orElseThrow(() -> new EntityNotFoundException("user.not_found"));
	}

	public User findEntityById(Long id) {
		return repository.findByIdAndDeletedIsFalse(id)
				.orElseThrow(() -> new EntityNotFoundException("user.not_found"));
	}

	public UserDto create(UserDto dto) {
		dto.setId(null);
		return saveDto(dto);
	}

	public UserDto update(UserDto dto) {
		findDtoById(dto.getId());
		return saveDto(dto);
	}

	public void deleteById(Long id) {
		User entity = findEntityById(id);
		entity.setDeleted(Boolean.TRUE);
		saveEntity(entity);
	}

	private void validateRoleExists(Long idRole) throws EntityNotFoundException {
		try {
			roleService.findById(idRole);
		} catch (EntityNotFoundException e) {
			throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, e.getReason());
		}
	}

	private UserDto saveDto(UserDto dto) {
		validateRoleExists(dto.getIdRole());
		return mapper.toDto(saveEntity(mapper.toEntity(dto)));
	}

	private User saveEntity(User entity) {
		return repository.save(entity);
	}

}
