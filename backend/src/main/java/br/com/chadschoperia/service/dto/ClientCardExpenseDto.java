package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ClientCardExpenseDto {
	private Long id;
	private ClientCardDto card;
	private Double value = 0.0;
	private String description;
	private LocalDateTime dateTime;
}
