package br.com.chadschoperia.service.reports.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public abstract class BaseReportDto {
	private final String description;
	private final Double value;
	private final LocalDateTime dateTime;
}
