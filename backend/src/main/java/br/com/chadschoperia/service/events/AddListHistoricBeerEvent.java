package br.com.chadschoperia.service.events;

import br.com.chadschoperia.domain.enums.HistoricProductActionEnum;
import org.springframework.context.MessageSource;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Objects;

public record AddListHistoricBeerEvent(@NonNull HistoricProductActionEnum action, @NonNull List<Long> beerIds, List<Double> stocks,
									   @NonNull List<Double> totalStocks, List<String> descriptions) {

	public String formatedDescription(int index, MessageSource messageSource) {
		String descrition = this.descriptions().get(index);
		if (Objects.nonNull(descrition)) {
			return descrition;
		}
		return this.action().formatMessage(messageSource);
	}
}
