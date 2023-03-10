package br.com.chadschoperia.service;

import br.com.chadschoperia.repository.UserRepository;
import br.com.chadschoperia.service.dto.UserDto;
import br.com.chadschoperia.service.dto.ViewUserDto;
import br.com.chadschoperia.service.exception.EntityNotFoundException;
import br.com.chadschoperia.service.mapper.UserMapper;
import br.com.chadschoperia.service.mapper.ViewUserMapper;
import br.com.chadschoperia.util.MessageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final RoleService roleService;

    private final UserRepository repository;

    private final UserMapper mapper;

    private final ViewUserMapper viewUserMapper;

    public List<ViewUserDto> findAll() {
        return viewUserMapper.toDto(repository.findAll());
    }

    public UserDto findById(Long id) {
        return mapper.toDto(repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(MessageUtil.USER_NOT_FOUND)));
    }

    private void existsById(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException(MessageUtil.USER_NOT_FOUND);
        }
    }

    public UserDto create(UserDto dto) {
        roleService.existsById(dto.getIdRole());
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    public UserDto update(UserDto dto) {
        existsById(dto.getId());
        roleService.existsById(dto.getIdRole());
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    public void deleteById(Long id) {
        existsById(id);
        repository.deleteById(id);
    }

}
