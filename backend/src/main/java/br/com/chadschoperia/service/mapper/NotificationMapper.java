package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.NotificationModel;
import br.com.chadschoperia.service.dto.NotificationDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper extends EntityMapper<NotificationDto, NotificationModel> {
}
