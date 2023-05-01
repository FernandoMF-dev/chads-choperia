package br.com.chadschoperia.service.reports.dto;

import java.time.LocalDateTime;

public class ClientExpesesReportDto extends BaseReportDto {
	public ClientExpesesReportDto(String description, Double value, LocalDateTime dateTime) {
		super(description, value, dateTime);
	}
}
