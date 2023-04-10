package br.com.chadschoperia.service.dto;

import br.com.chadschoperia.service.events.AddClientCardExpenseEvent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ClientCardExpenseDto {
	private Long id;
	private Long idCard;
	private Double value = 0.0;
	private String description;
	private LocalDateTime dateTime;

	public ClientCardExpenseDto(AddClientCardExpenseEvent event) {
		this.idCard = event.idClientCard();
		this.value = event.value();
		this.description = event.description();
	}
}
