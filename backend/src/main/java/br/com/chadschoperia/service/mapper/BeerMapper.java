package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.Beer;
import br.com.chadschoperia.service.dto.BeerDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BeerMapper extends EntityMapper<BeerDto, Beer> {

	@Override
	@Mapping(source = "rfid", target = "rfid")
	Beer toEntity(BeerDto beerDto);

	@Override
	@Mapping(source = "rfid", target = "rfid")
	BeerDto toDto(Beer entity);

}
