package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.model.ProductModel;
import br.com.chadschoperia.service.dto.ProductDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper extends EntityMapper<ProductDto, ProductModel> {
}
