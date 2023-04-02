package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.UserRole;
import br.com.chadschoperia.service.dto.DropdownDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper extends EntityMapper<DropdownDto, UserRole> {
}
