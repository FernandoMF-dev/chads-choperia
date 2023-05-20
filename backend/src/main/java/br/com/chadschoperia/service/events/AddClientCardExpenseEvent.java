package br.com.chadschoperia.service.events;

import br.com.chadschoperia.domain.enums.SellingPointEnum;
import org.springframework.lang.NonNull;

public record AddClientCardExpenseEvent(@NonNull long idClientCard, @NonNull double value, @NonNull String description,
										@NonNull SellingPointEnum sellingPoint) {
}
