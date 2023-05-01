package br.com.chadschoperia.service.reports.dto;

import br.com.chadschoperia.domain.enums.HistoricBeerActionEnum;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BeerStockReportDto extends BaseReportDto {
	private final HistoricBeerActionEnum action;
	private final Double totalStock;

	public BeerStockReportDto(HistoricBeerActionEnum action, String description, Double stock, Double totalStock, LocalDateTime dateTime) {
		super(description, stock, dateTime);
		this.action = action;
		this.totalStock = totalStock;
	}
}
