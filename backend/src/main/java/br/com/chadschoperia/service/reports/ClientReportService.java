package br.com.chadschoperia.service.reports;

import br.com.chadschoperia.repository.reports.ClientReportRepository;
import br.com.chadschoperia.service.reports.dto.ClientExpesesReportDto;
import br.com.chadschoperia.service.reports.exceptions.InvalidFilterException;
import br.com.chadschoperia.service.reports.filters.ClientReportFilterDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientReportService {
	private final ClientReportRepository clientReportRepository;

	public List<ClientExpesesReportDto> getExpensesOverTime(ClientReportFilterDto filter) {
		validateStockOverTimeFilter(filter);
		return clientReportRepository.getExpensesOverTime(filter);
	}

	private void validateStockOverTimeFilter(ClientReportFilterDto filter) {
		if (Objects.nonNull(filter.getMinDate()) && Objects.nonNull(filter.getMaxDate()) && filter.getMaxDate().isBefore(filter.getMinDate())) {
			throw new InvalidFilterException("report.filter.max_date.less_than.min_date");
		}
	}
}
