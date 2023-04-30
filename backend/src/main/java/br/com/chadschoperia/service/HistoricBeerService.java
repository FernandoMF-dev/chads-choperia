package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.historics.HistoricBeer;
import br.com.chadschoperia.repository.HistoricBeerRepository;
import br.com.chadschoperia.service.events.AddHistoricBeerEvent;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.context.MessageSource;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class HistoricBeerService {
	private final HistoricBeerRepository historicBeerRepository;
	private final MessageSource historicMessageSource;

	@EventListener
	public void addHistoric(AddHistoricBeerEvent event) {
		String description = ObjectUtils.defaultIfNull(event.description(), event.action().formatMessage(this.historicMessageSource));
		HistoricBeer historic = new HistoricBeer(event.idBeer(), description, event.stock(), event.action());
		historicBeerRepository.save(historic);
	}
}
