package br.com.chadschoperia.service.events;

import br.com.chadschoperia.domain.enums.SellingPointEnum;
import org.springframework.lang.NonNull;

import java.util.List;

public record AddListRevenueExpenseEvent(@NonNull List<Double> values, @NonNull List<String> descriptions,
										 @NonNull SellingPointEnum sellingPoint) {
}
