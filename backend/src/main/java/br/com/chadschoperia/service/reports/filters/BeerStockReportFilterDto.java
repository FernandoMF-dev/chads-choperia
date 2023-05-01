package br.com.chadschoperia.service.reports.filters;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BeerStockReportFilterDto implements Serializable {
	private LocalDateTime minDate;
	private LocalDateTime maxDate;
	private List<Long> beers;
}
