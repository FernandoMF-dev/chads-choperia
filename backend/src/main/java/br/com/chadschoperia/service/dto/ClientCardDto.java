package br.com.chadschoperia.service.dto;

import br.com.chadschoperia.domain.enums.ClientCardStatusEnum;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

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
	private ClientCardStatusEnum cardStatus;
}
