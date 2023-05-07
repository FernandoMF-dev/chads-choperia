package br.com.chadschoperia.service.reports.dto;

import br.com.chadschoperia.domain.enums.HistoricProductActionEnum;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public abstract class BaseStockReportDto extends BaseReportDto {
	private final HistoricProductActionEnum action;
	private final Long productId;
	private final String productName;
	private final Double totalStock;

	public BaseStockReportDto(String description, Double value, LocalDateTime dateTime, HistoricProductActionEnum action,
							  Long productId, String productName, Double totalStock) {
		super(description, value, dateTime);
		this.action = action;
		this.productId = productId;
		this.productName = productName;
		this.totalStock = totalStock;
	}
}
