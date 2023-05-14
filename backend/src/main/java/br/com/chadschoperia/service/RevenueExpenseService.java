package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.RevenueExpense;
import br.com.chadschoperia.repository.RevenueExpenseRepository;
import br.com.chadschoperia.service.events.AddRevenueExpenseEvent;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class RevenueExpenseService {
	private final RevenueExpenseRepository repository;

	@EventListener
	public void addRevenueExpense(AddRevenueExpenseEvent event) {
		RevenueExpense entity = new RevenueExpense(event.description(), event.value());
		repository.save(entity);
	}
}
