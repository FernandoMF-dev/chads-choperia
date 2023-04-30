package br.com.chadschoperia.service.dto.reports;

import java.time.LocalDateTime;

public class BeerStockReportDto extends BaseReportDto {
	public BeerStockReportDto(String description, Double value, LocalDateTime dateTime) {
		super(description, value, dateTime);
	}
}
