package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.ClientCardExpense;
import br.com.chadschoperia.repository.ClientCardExpenseRepository;
import br.com.chadschoperia.service.dto.PourBeerDTO;
import br.com.chadschoperia.service.mapper.ClientCardExpenseMapper;
import br.com.chadschoperia.service.mapper.ClientCardMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientCardExpenseService {

	private final ClientCardExpenseRepository repository;
	private final ClientCardExpenseMapper mapper;
	private final ClientCardMapper clientCardMapper;
	private final ClientCardService clientCardService;
	private final BeerService beerService;



	public void pourBeer(PourBeerDTO dto){
		ClientCardExpense entity = new ClientCardExpense();
		entity.setCard(clientCardMapper.toEntity(clientCardService.findOpenByRfid(dto.getCard())));
		entity.setValue(beerService.findById(dto.getBeer()).getValuePerMug());
		entity.setDateTime(LocalDateTime.now());
		repository.save(entity);
	}
}
