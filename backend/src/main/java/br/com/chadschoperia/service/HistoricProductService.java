package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.historics.HistoricProduct;
import br.com.chadschoperia.repository.HistoricProductRepository;
import br.com.chadschoperia.service.events.AddHistoricProductEvent;
import br.com.chadschoperia.service.events.AddListHistoricProductEvent;
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
public class HistoricProductService {
	private final HistoricProductRepository historicProductRepository;
	private final MessageSource historicMessageSource;

	@EventListener
	public void addHistoric(AddHistoricProductEvent event) {
		HistoricProduct historic = new HistoricProduct(event.idProduct(), event.action(), event.formatedDescription(historicMessageSource), event.stock(), event.totalStock());
		historicProductRepository.save(historic);
	}

	@EventListener
	public void AddListHistoricProduct(AddListHistoricProductEvent event) {
		List<HistoricProduct> historics = new ArrayList<>();
		LocalDateTime dateTime = LocalDateTime.now();

		for (int i = 0; i < event.productIds().size(); i++) {
			historics.add(new HistoricProduct(event.productIds().get(i), event.action(), event.formatedDescription(i, historicMessageSource),
					event.stocks().get(i), event.totalStocks().get(i), dateTime));
		}

		historicProductRepository.saveAll(historics);
	}
}
