package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.ClientCardExpense;
import br.com.chadschoperia.service.dto.ClientCardExpenseDto;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClientCardExpenseMapper extends EntityMapper<ClientCardExpenseDto, ClientCardExpense> {
	@Override
	@Mapping(source = "card.id", target = "idCard")
	ClientCardExpenseDto toDto(ClientCardExpense entity);

	@Override
	@InheritInverseConfiguration
	ClientCardExpense toEntity(ClientCardExpenseDto dto);
}
