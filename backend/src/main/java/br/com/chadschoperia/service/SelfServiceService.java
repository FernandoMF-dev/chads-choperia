package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.SelfService;
import br.com.chadschoperia.repository.SelfServiceRepository;
import br.com.chadschoperia.service.dto.SelfServiceDto;
import br.com.chadschoperia.service.events.AddClientCardExpenseEvent;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class SelfServiceService {

	private final ApplicationEventPublisher applicationEventPublisher;

	private final SelfServiceRepository repository;

	private final ClientCardService clientCardService;
	public static final String SELF_SERVICE_DESCRIPTION = "Self-service";


	public SelfServiceDto insertExpense(SelfServiceDto dto){
		double value = dto.getWeight() * getPricePerKg();
		applicationEventPublisher.publishEvent(new AddClientCardExpenseEvent(clientCardService.findOpenByRfid(dto.getCardId().toString()).getId(),value , SELF_SERVICE_DESCRIPTION));
		return dto;
	}

	public void insertPricePerKg(double pricePerKg){
		SelfService entity = new SelfService();
		entity.setPricePerKg(pricePerKg);
		entity.setDateTime(LocalDateTime.now());
		repository.save(entity);
	}

	public double getPricePerKg(){
		return repository.getAllOrderByDateTime().get(0).getPricePerKg();
	}

}
