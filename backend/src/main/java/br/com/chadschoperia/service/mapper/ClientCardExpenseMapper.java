package br.com.chadschoperia.service.mapper;

import br.com.chadschoperia.domain.entities.ClientCardExpense;
import br.com.chadschoperia.service.dto.ClientCardExpenseDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ClientCardMapper.class})
public interface ClientCardExpenseMapper extends EntityMapper<ClientCardExpenseDto, ClientCardExpense> {
}
