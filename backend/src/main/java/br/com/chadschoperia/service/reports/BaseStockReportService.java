package br.com.chadschoperia.service.reports;

import br.com.chadschoperia.service.reports.dto.BaseStockReportDto;
import br.com.chadschoperia.service.reports.exceptions.InvalidFilterException;
import br.com.chadschoperia.service.reports.filters.BaseStockReportFilterDto;

import java.util.List;
import java.util.Objects;

public abstract class BaseStockReportService<DTO extends BaseStockReportDto, F extends BaseStockReportFilterDto> {
	public abstract List<DTO> getStockReportOverTime(F filter);

	protected void validateStockOverTimeFilter(F filter) {
		if (Objects.nonNull(filter.getMinDate()) && Objects.nonNull(filter.getMaxDate()) && filter.getMaxDate().isBefore(filter.getMinDate())) {
			throw new InvalidFilterException("report.filter.max_date.less_than.min_date");
		}
	}
}
