package br.com.chadschoperia.service.dto.reports;

import java.time.LocalDateTime;

public class ProductStockReportDto extends BaseReportDto {
	public ProductStockReportDto(String description, Double value, LocalDateTime dateTime) {
		super(description, value, dateTime);
	}
}
