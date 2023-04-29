package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.RestockNotification;
import br.com.chadschoperia.service.dto.RestockNotificationDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RestockNotificationMapper extends EntityMapper<RestockNotificationDto, RestockNotification> {
}
