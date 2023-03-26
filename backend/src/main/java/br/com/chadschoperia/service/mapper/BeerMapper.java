package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.model.BeerModel;
import br.com.chadschoperia.service.dto.BeerDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BeerMapper extends EntityMapper<BeerDto, BeerModel> {
}
