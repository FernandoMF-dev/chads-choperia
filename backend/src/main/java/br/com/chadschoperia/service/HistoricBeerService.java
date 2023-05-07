package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.historics.HistoricBeer;
import br.com.chadschoperia.repository.HistoricBeerRepository;
import br.com.chadschoperia.service.events.AddHistoricBeerEvent;
import br.com.chadschoperia.service.events.AddListHistoricBeerEvent;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class HistoricBeerService {
	private final HistoricBeerRepository historicBeerRepository;
	private final MessageSource historicMessageSource;

	@EventListener
	public void addHistoric(AddHistoricBeerEvent event) {
		HistoricBeer historic = new HistoricBeer(event.idBeer(), event.action(), event.formatedDescription(historicMessageSource), event.stock(), event.totalStock());
		historicBeerRepository.save(historic);
	}

	@EventListener
	public void AddListHistoricBeer(AddListHistoricBeerEvent event) {
		List<HistoricBeer> historics = new ArrayList<>();
		LocalDateTime dateTime = LocalDateTime.now();

		for (int i = 0; i < event.beerIds().size(); i++) {
			historics.add(new HistoricBeer(event.beerIds().get(i), event.action(), event.formatedDescription(i, historicMessageSource),
					event.stocks().get(i), event.totalStocks().get(i), dateTime));
		}

		historicBeerRepository.saveAll(historics);
	}
}
