package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.model.UserModel;
import br.com.chadschoperia.service.dto.ViewUserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ViewUserMapper extends EntityMapper<ViewUserDto, UserModel> {

	@Override
	@Mapping(source = "role.name", target = "roleName")
	ViewUserDto toDto(UserModel entity);

	@Override
	@Mapping(source = "roleName", target = "role.name")
	UserModel toEntity(ViewUserDto dto);

}
