package br.com.chadschoperia.service.reports.dto;

import br.com.chadschoperia.domain.enums.HistoricProductActionEnum;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ProductStockReportDto extends BaseStockReportDto {

	private final Long barcode;

	public ProductStockReportDto(HistoricProductActionEnum action, String description, Long productId, String productName,
								 Double stock, Double totalStock, LocalDateTime dateTime, Long barcode) {
		super(description, stock, dateTime, action, productId, productName, totalStock);
		this.barcode = barcode;
	}
}
