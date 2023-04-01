package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.User;
import br.com.chadschoperia.service.dto.ViewUserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ViewUserMapper extends EntityMapper<ViewUserDto, User> {

	@Override
	@Mapping(source = "role.name", target = "roleName")
	ViewUserDto toDto(User entity);

	@Override
	@Mapping(source = "roleName", target = "role.name")
	User toEntity(ViewUserDto dto);

}
