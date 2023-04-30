package br.com.chadschoperia.service.events;

import br.com.chadschoperia.domain.enums.HistoricBeerActionEnum;
import org.springframework.lang.NonNull;

public record AddHistoricBeerEvent(@NonNull long idBeer, @NonNull HistoricBeerActionEnum action, String description, Double stock) {
}
