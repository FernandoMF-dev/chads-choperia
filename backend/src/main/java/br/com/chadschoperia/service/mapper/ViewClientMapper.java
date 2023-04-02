package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.Client;
import br.com.chadschoperia.service.dto.ViewClientDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ViewClientMapper extends EntityMapper<ViewClientDto, Client> {
}
