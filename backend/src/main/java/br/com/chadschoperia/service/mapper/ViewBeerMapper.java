package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.Beer;
import br.com.chadschoperia.service.dto.ViewBeerDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ViewBeerMapper extends EntityMapper<ViewBeerDto, Beer> {
}
