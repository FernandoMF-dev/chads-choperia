package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.Role;
import br.com.chadschoperia.domain.entities.User;
import br.com.chadschoperia.service.dto.ViewUserDto;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserViewMapper extends EntityMapper<ViewUserDto, User> {

	@Override
	ViewUserDto toDto(User entity);

	@Override
	User toEntity(ViewUserDto dto);

	@AfterMapping
	default void mapRole(@MappingTarget ViewUserDto dto, User user) {
		dto.setRoleNames(user.getRoles().stream().map(Role::getRoleName).toList().toString());
	}


}
