package br.com.chadschoperia.service.reports.dto;

import br.com.chadschoperia.domain.enums.RevenueExpenseTypeEnum;
import br.com.chadschoperia.domain.enums.SellingPointEnum;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class RevenueExpenseReportDto extends BaseReportDto {
	private final RevenueExpenseTypeEnum type;
	private final SellingPointEnum sellingPoint;

	public RevenueExpenseReportDto(RevenueExpenseTypeEnum type, String description, LocalDateTime dateTime, Double value, SellingPointEnum sellingPoint) {
		super(description, value, dateTime);
		this.type = type;
		this.sellingPoint = sellingPoint;
	}
}
