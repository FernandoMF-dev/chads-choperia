package br.com.chadschoperia.service.reports.dto;

import br.com.chadschoperia.domain.enums.HistoricBeerActionEnum;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class BeerStockReportDto extends BaseReportDto {
	private final HistoricBeerActionEnum action;
	private final Long beerId;
	private final String beerName;
	private final String rfid;
	private final Double totalStock;

	public BeerStockReportDto(HistoricBeerActionEnum action, String description, Long beerId, String beerName, String rfid,
							  Double stock, Double totalStock, LocalDateTime dateTime) {
		super(description, stock, dateTime);
		this.action = action;
		this.beerId = beerId;
		this.beerName = beerName;
		this.rfid = rfid;
		this.totalStock = totalStock;
	}
}
