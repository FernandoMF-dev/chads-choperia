package br.com.chadschoperia.service.dto.reports;

import java.time.LocalDateTime;

public class IncomeAndExpenseReportDto extends BaseReportDto {
	public IncomeAndExpenseReportDto(String description, Double value, LocalDateTime dateTime) {
		super(description, value, dateTime);
	}
}
