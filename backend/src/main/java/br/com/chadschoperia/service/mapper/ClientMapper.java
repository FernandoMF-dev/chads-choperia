package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.Client;
import br.com.chadschoperia.service.dto.ClientDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ClientMapper extends EntityMapper<ClientDto, Client> {
}
