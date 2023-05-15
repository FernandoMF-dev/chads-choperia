package br.com.chadschoperia.service.reports.dto;

import br.com.chadschoperia.domain.enums.RevenueExpenseTypeEnum;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class RevenueExpenseReportDto extends BaseReportDto {
	private final RevenueExpenseTypeEnum type;

	public RevenueExpenseReportDto(RevenueExpenseTypeEnum type, String description, LocalDateTime dateTime, Double value) {
		super(description, value, dateTime);
		this.type = type;
	}
}
