package br.com.chadschoperia.service.reports;

import br.com.chadschoperia.repository.reports.RevenueExpenseReportRepository;
import br.com.chadschoperia.service.reports.dto.RevenueExpenseReportDto;
import br.com.chadschoperia.service.reports.filters.RevenueExpenseReportFilterDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class RevenueExpenseReportService {
	private final RevenueExpenseReportRepository revenueExpenseReportRepository;

	public List<RevenueExpenseReportDto> getRevenueExpenseOverTime(RevenueExpenseReportFilterDto filter) {
		return revenueExpenseReportRepository.getRevenueExpenseOverTime(filter);
	}
}
