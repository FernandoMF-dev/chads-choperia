package br.com.chadschoperia.service.events;

import org.springframework.lang.NonNull;

public record AddRevenueExpenseEvent(@NonNull Double value, @NonNull String description) {
}
