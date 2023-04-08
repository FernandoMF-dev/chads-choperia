package br.com.chadschoperia.service.events;

import org.springframework.lang.NonNull;

public record AddClientCardExpenseEvent(@NonNull long idClientCard, @NonNull double value, @NonNull String description) {
}
