package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.Role;
import br.com.chadschoperia.domain.entities.User;
import br.com.chadschoperia.service.dto.UserDto;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper extends EntityMapper<UserDto, User> {

	@Override
	UserDto toDto(User entity);

	@Override
	User toEntity(UserDto dto);

	@AfterMapping
	default void mapRole(@MappingTarget User user, UserDto dto){
		dto.getIdsRole().forEach(id -> {
			user.getRoles().add(new Role(id));
		});
	}

	@AfterMapping
	default void mapRole(@MappingTarget UserDto dto, User user){
		user.getRoles().forEach(role -> {
			dto.getIdsRole().add(role.getId());
		});
	}


}
