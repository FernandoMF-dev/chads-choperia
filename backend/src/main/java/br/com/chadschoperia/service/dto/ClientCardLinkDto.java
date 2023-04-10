package br.com.chadschoperia.service.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientCardLinkDto {
	@NotNull(message = "client_card.rfid.not_null")
	private String rfid;
	@NotNull(message = "client_card.client.not_null")
	private Long idClient;
}
