package br.com.chadschoperia.service.reports.dto;

import br.com.chadschoperia.domain.entities.Client;
import br.com.chadschoperia.domain.entities.ClientCard;
import br.com.chadschoperia.domain.enums.ClientCardStatusEnum;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ClientExpesesReportDto extends BaseReportDto {
	private final Long clientId;
	private final String clientName;
	private final String clientTelephone;
	private final String clientEmail;
	private final Long clientCardId;
	private final ClientCardStatusEnum clientCardStatus;
	private final String clientCardrfid;

	public ClientExpesesReportDto(String description, Double value, LocalDateTime dateTime, Client client, ClientCard card) {
		super(description, value, dateTime);
		this.clientId = client.getId();
		this.clientName = client.getName();
		this.clientTelephone = client.getTelephone();
		this.clientEmail = client.getEmail();
		this.clientCardId = card.getId();
		this.clientCardStatus = card.getStatus();
		this.clientCardrfid = card.getRfid();
	}
}
