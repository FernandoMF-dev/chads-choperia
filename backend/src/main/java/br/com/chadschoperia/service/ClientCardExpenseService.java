package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.ClientCardExpense;
import br.com.chadschoperia.repository.ClientCardExpenseRepository;
import br.com.chadschoperia.service.dto.ClientCardExpenseDto;
import br.com.chadschoperia.service.events.AddClientCardExpenseEvent;
import br.com.chadschoperia.service.mapper.ClientCardExpenseMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientCardExpenseService {

	private final ClientCardExpenseRepository repository;
	private final ClientCardExpenseMapper mapper;

	@EventListener
	public void addExpense(AddClientCardExpenseEvent event) {
		ClientCardExpenseDto dto = new ClientCardExpenseDto(event);

		dto.setDateTime(LocalDateTime.now());

		insert(dto);
	}

	private void insert(ClientCardExpenseDto dto) {
		ClientCardExpense entity = mapper.toEntity(dto);

		entity.setId(null);
		entity = repository.save(entity);

		mapper.toDto(entity);
	}

}
