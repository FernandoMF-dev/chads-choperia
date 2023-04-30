package br.com.chadschoperia.service.dto.reports;

import java.time.LocalDateTime;

public class ClientExpesesReportDto extends BaseReportDto {
	public ClientExpesesReportDto(String description, Double value, LocalDateTime dateTime) {
		super(description, value, dateTime);
	}
}
