package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.Beer;
import br.com.chadschoperia.exceptions.BusinessException;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.BeerRepository;
import br.com.chadschoperia.repository.SelfServiceRepository;
import br.com.chadschoperia.service.dto.BeerDto;
import br.com.chadschoperia.service.dto.ClientCardDto;
import br.com.chadschoperia.service.dto.ClientCardExpenseDto;
import br.com.chadschoperia.service.dto.PourBeerDTO;
import br.com.chadschoperia.service.dto.ProductStockDto;
import br.com.chadschoperia.service.dto.SelfServiceDto;
import br.com.chadschoperia.service.dto.ViewBeerDto;
import br.com.chadschoperia.service.events.AddClientCardExpenseEvent;
import br.com.chadschoperia.service.mapper.BeerMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class SelfServiceService {

	private final ApplicationEventPublisher applicationEventPublisher;

	private final SelfServiceRepository repository;

	private final ClientCardService clientCardService;
	public static final String SELF_SERVICE_DESCRIPTION = "Self-service expense";


	public SelfServiceDto insertExpense(SelfServiceDto dto){
		double value = dto.getWeight() * getValuePerKg();
		applicationEventPublisher.publishEvent(new AddClientCardExpenseEvent(clientCardService.findOpenByRfid(dto.getCardId().toString()).getId(),value , SELF_SERVICE_DESCRIPTION));
		return dto;
	}

	public double getValuePerKg(){
		return repository.getAllOrderByDateTime().get(0).getPricePerKg();
	}

}
