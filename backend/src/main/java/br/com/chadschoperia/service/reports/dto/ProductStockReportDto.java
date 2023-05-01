package br.com.chadschoperia.service.reports.dto;

import java.time.LocalDateTime;

public class ProductStockReportDto extends BaseReportDto {
	public ProductStockReportDto(String description, Double value, LocalDateTime dateTime) {
		super(description, value, dateTime);
	}
}
