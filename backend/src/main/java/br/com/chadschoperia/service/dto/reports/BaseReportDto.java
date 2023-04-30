package br.com.chadschoperia.service.dto.reports;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public abstract class BaseReportDto {
	private String description;
	private Double value;
	private LocalDateTime dateTime;
}
