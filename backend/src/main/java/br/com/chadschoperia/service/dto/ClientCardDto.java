package br.com.chadschoperia.service.dto;

import br.com.chadschoperia.domain.enums.ClientCardStatusEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
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

	public ClientCardDto(ClientDto client, Long rfid, LocalDateTime checkIn, ClientCardStatusEnum status) {
		this.client = client;
		this.rfid = rfid;
		this.checkIn = checkIn;
		this.status = status;
	}
}
