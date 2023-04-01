package br.com.chadschoperia.service.dto;

import br.com.chadschoperia.domain.enums.ClientCardStatusEnum;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ClientCardDto {
	private Long id;
	private ClientDto client;
	private Long rfid;
	private Double payment = 0.0;
	private String paymentMethod;
	private LocalDateTime checkIn;
	private LocalDateTime checkOut;
	private ClientCardStatusEnum status;
	private List<ClientCardExpenseDto> expenses = new ArrayList<>();

	private Double totalExpenses = 0.0;
	private Double change = 0.0;
}
