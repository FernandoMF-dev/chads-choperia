package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.SelfserviceSettings;
import br.com.chadschoperia.service.dto.SelfserviceSettingsDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SelfserviceSettingsMapper extends EntityMapper<SelfserviceSettingsDto, SelfserviceSettings> {
}
