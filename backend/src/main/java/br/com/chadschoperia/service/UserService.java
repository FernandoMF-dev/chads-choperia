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

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    private final ViewUserMapper viewUserMapper;

    public List<ViewUserDto> findAll() {
        return viewUserMapper.toDto(userRepository.findAll());
    }

    public UserDto findById(Long idUser) {
        return userMapper.toDto(userRepository.findById(idUser)
                .orElseThrow(() -> new EntityNotFoundException(MessageUtil.USER_NOT_FOUND)));
    }

    private void existsById(Long idUser) {
        if (!userRepository.existsById(idUser)) {
            throw new EntityNotFoundException(MessageUtil.USER_NOT_FOUND);
        }
    }

    public UserDto create(UserDto userDto) {
        roleService.existsById(userDto.getIdRole());
        return userMapper.toDto(userRepository.save(userMapper.toEntity(userDto)));
    }

    public UserDto update(UserDto userDto) {
        existsById(userDto.getId());
        roleService.existsById(userDto.getIdRole());
        return userMapper.toDto(userRepository.save(userMapper.toEntity(userDto)));
    }

    public void deleteById(Long idUser) {
        existsById(idUser);
        userRepository.deleteById(idUser);
    }

}
