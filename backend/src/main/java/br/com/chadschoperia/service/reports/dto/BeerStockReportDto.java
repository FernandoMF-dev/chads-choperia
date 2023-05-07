package br.com.chadschoperia.service.reports.dto;

import br.com.chadschoperia.domain.enums.HistoricProductActionEnum;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BeerStockReportDto extends BaseStockReportDto {
	private final String rfid;


	public BeerStockReportDto(HistoricProductActionEnum action, String description, Long productId, String productName,
							  Double stock, Double totalStock, LocalDateTime dateTime, String rfid) {
		super(description, stock, dateTime, action, productId, productName, totalStock);
		this.rfid = rfid;
	}
}
