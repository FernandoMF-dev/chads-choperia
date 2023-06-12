package br.com.chadschoperia.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.context.MessageSource;

import java.util.Locale;

@Getter
@AllArgsConstructor
public enum HistoricProductActionEnum {
	CREATE("default.create"),
	UPDATE("default.update"),
	RESTOCK("default.restock"),
	UNSTOCK("default.unstock"),
	POUR("beer.pour"),
	DELETE("default.deleted");

	private final String message;

	public String formatMessage(MessageSource messageSource) {
		return messageSource.getMessage(this.getMessage(), null, Locale.getDefault());
	}
}
