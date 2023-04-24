package br.com.chadschoperia.service.dto;

import br.com.chadschoperia.service.events.AddClientCardExpenseEvent;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class SelfServiceDto {

	private Long cardId;
	private Double weight = 0.0;

}
