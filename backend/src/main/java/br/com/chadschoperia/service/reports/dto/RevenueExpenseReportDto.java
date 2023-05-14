package br.com.chadschoperia.service.reports.dto;

import br.com.chadschoperia.domain.enums.RevenueExpenseTypeEnum;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
public class RevenueExpenseReportDto implements Serializable {
	private RevenueExpenseTypeEnum type;
	private String description;
	private LocalDateTime dateTime;
	private Double value;

	public RevenueExpenseReportDto(RevenueExpenseTypeEnum type, String description, LocalDateTime dateTime, Double value) {
		this.type = type;
		this.description = description;
		this.dateTime = dateTime;
		this.value = value;
	}
}
