package br.com.chadschoperia.service.reports;

import br.com.chadschoperia.repository.reports.ClientReportRepository;
import br.com.chadschoperia.service.reports.dto.ClientExpesesReportDto;
import br.com.chadschoperia.service.reports.exceptions.InvalidFilterException;
import br.com.chadschoperia.service.reports.filters.ClientExpesesReportFilterDto;
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

	public List<ClientExpesesReportDto> getExpensesOverTime(ClientExpesesReportFilterDto filter) {
		validateStockOverTimeFilter(filter);
		return clientReportRepository.getExpensesOverTime(filter, filter.getOrder().name());
	}

	private void validateStockOverTimeFilter(ClientExpesesReportFilterDto filter) {
		if (Objects.nonNull(filter.getMinDate()) && Objects.nonNull(filter.getMaxDate()) && filter.getMaxDate().isBefore(filter.getMinDate())) {
			throw new InvalidFilterException("report.filter.max_date.less_than.min_date");
		}
	}
}
