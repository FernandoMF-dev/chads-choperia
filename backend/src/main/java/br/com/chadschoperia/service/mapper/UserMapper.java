package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.User;
import br.com.chadschoperia.service.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper extends EntityMapper<UserDto, User> {

	@Override
	UserDto toDto(User entity);

	@Override
	User toEntity(UserDto dto);

}
