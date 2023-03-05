package br.com.chadschoperia.service;

import br.com.chadschoperia.repository.RoleRepository;
import br.com.chadschoperia.service.dto.DropdownDto;
import br.com.chadschoperia.service.exception.EntityNotFoundException;
import br.com.chadschoperia.service.mapper.RoleMapper;
import br.com.chadschoperia.util.MessageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    private final RoleMapper roleMapper;

    public List<DropdownDto> findAll() {
        return roleMapper.toDto(roleRepository.findAll());
    }

    public DropdownDto findById(Long idRole) {
        return roleMapper.toDto(roleRepository.findById(idRole)
                .orElseThrow(() -> new EntityNotFoundException(MessageUtil.ROLE_NOT_FOUND)));
    }

}
