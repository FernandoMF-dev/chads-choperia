package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.ClientCard;
import br.com.chadschoperia.service.dto.ClientCardDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ClientMapper.class})
public interface ClientCardMapper extends EntityMapper<ClientCardDto, ClientCard> {
}
