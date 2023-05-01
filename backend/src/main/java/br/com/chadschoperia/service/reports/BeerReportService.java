package br.com.chadschoperia.service.reports;

import br.com.chadschoperia.repository.reports.BeerReportRepository;
import br.com.chadschoperia.service.reports.dto.BeerStockReportDto;
import br.com.chadschoperia.service.reports.exceptions.InvalidFilterException;
import br.com.chadschoperia.service.reports.filters.BeerStockReportFilterDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class BeerReportService {
	private final BeerReportRepository beerReportRepository;

	public List<BeerStockReportDto> reportBeerStockOverTime(BeerStockReportFilterDto filter) {
		validateBeerStockOverTimeFilter(filter);
		return beerReportRepository.reportBeerStockOverTime(filter);
	}

	private void validateBeerStockOverTimeFilter(BeerStockReportFilterDto filter) {
		if (Objects.nonNull(filter.getMinDate()) && Objects.nonNull(filter.getMaxDate()) && filter.getMaxDate().isBefore(filter.getMinDate())) {
			throw new InvalidFilterException("report.filter.max_date.less_than.min_date");
		}
	}
}
