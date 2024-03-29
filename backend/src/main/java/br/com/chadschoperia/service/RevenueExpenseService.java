package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.RevenueExpense;
import br.com.chadschoperia.repository.RevenueExpenseRepository;
import br.com.chadschoperia.service.events.AddListRevenueExpenseEvent;
import br.com.chadschoperia.service.events.AddRevenueExpenseEvent;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RevenueExpenseService {
	private final RevenueExpenseRepository repository;

	@EventListener
	public void addRevenueExpense(AddRevenueExpenseEvent event) {
		RevenueExpense entity = new RevenueExpense(event.description(), event.value(), event.sellingPoint());
		repository.save(entity);
	}

	@EventListener
	public void addListRevenueExpense(AddListRevenueExpenseEvent event) {
		List<RevenueExpense> entities = new ArrayList<>();
		LocalDateTime dateTime = LocalDateTime.now();
		for (int i = 0; i < event.values().size(); i++) {
			entities.add(new RevenueExpense(event.descriptions().get(i), event.values().get(i), event.sellingPoint(), dateTime));
		}
		repository.saveAll(entities);
	}
}
