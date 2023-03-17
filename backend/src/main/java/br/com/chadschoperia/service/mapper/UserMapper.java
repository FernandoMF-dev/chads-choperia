package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.model.UserModel;
import br.com.chadschoperia.service.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper extends EntityMapper<UserDto, UserModel> {

	@Override
	@Mapping(source = "role.id", target = "idRole")
	@Mapping(source = "role.name", target = "roleName")
	UserDto toDto(UserModel entity);

	@Override
	@Mapping(source = "idRole", target = "role.id")
	@Mapping(source = "roleName", target = "role.name")
	UserModel toEntity(UserDto dto);

}
