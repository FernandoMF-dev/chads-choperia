package br.com.chadschoperia.service.reports;

import br.com.chadschoperia.repository.reports.RevenueExpenseReportRepository;
import br.com.chadschoperia.service.reports.dto.RevenueExpenseReportDto;
import br.com.chadschoperia.service.reports.exceptions.InvalidFilterException;
import br.com.chadschoperia.service.reports.filters.RevenueExpenseReportFilterDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class RevenueExpenseReportService {
	private final RevenueExpenseReportRepository revenueExpenseReportRepository;

	public List<RevenueExpenseReportDto> getRevenueExpenseOverTime(RevenueExpenseReportFilterDto filter) {
		validateStockOverTimeFilter(filter);
		return revenueExpenseReportRepository.getRevenueExpenseOverTime(filter);
	}

	private void validateStockOverTimeFilter(RevenueExpenseReportFilterDto filter) {
		if (Objects.nonNull(filter.getMinDate()) && Objects.nonNull(filter.getMaxDate()) && filter.getMaxDate().isBefore(filter.getMinDate())) {
			throw new InvalidFilterException("report.filter.max_date.less_than.min_date");
		}
	}
}
