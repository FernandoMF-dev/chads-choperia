package br.com.chadschoperia.service.reports;

import br.com.chadschoperia.repository.reports.BeerReportRepository;
import br.com.chadschoperia.service.reports.dto.BeerConsumptionReportDto;
import br.com.chadschoperia.service.reports.dto.BeerStockReportDto;
import br.com.chadschoperia.service.reports.exceptions.InvalidFilterException;
import br.com.chadschoperia.service.reports.filters.BaseStockReportFilterDto;
import br.com.chadschoperia.service.reports.filters.BeerConsumptionReportFilterDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class BeerReportService extends BaseStockReportService<BeerStockReportDto, BaseStockReportFilterDto> {
	private final BeerReportRepository beerReportRepository;

	@Override
	public List<BeerStockReportDto> getStockReportOverTime(BaseStockReportFilterDto filter) {
		validateStockOverTimeFilter(filter);
		return beerReportRepository.reportBeerStockOverTime(filter);
	}

	private void validateConsumptionOverTimeFilter(BeerConsumptionReportFilterDto filter) {
		if (Objects.nonNull(filter.getMinDate()) && Objects.nonNull(filter.getMaxDate()) && filter.getMaxDate().isBefore(filter.getMinDate())) {
			throw new InvalidFilterException("report.filter.max_date.less_than.min_date");
		}
	}

	public List<BeerConsumptionReportDto> getConsumptionReportOverTime(BeerConsumptionReportFilterDto filter) {
		validateConsumptionOverTimeFilter(filter);
		return beerReportRepository.reportBeerConsumptionOverTime(filter);
	}
	
}
