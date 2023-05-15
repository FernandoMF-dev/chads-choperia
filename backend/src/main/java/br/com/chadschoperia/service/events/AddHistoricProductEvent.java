package br.com.chadschoperia.service.events;

import br.com.chadschoperia.domain.enums.HistoricProductActionEnum;
import org.springframework.context.MessageSource;
import org.springframework.lang.NonNull;

import java.util.Objects;

public record AddHistoricProductEvent(@NonNull Long idProduct, @NonNull HistoricProductActionEnum action, Double stock,
									  @NonNull Double totalStock, String description) {
	public String formatedDescription(MessageSource messageSource) {
		if (Objects.nonNull(this.description())) {
			return this.description();
		}
		return this.action().formatMessage(messageSource);
	}
}
