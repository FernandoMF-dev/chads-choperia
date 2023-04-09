package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.Beer;
import br.com.chadschoperia.service.dto.ViewBeerDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ViewBeerMapper extends EntityMapper<ViewBeerDto, Beer> {

	@Override
	@Mapping(source = "rfid", target = "rfid")
	Beer toEntity(ViewBeerDto dto);

	@Override
	@Mapping(source = "rfid", target = "rfid")
	ViewBeerDto toDto(Beer entity);

}
