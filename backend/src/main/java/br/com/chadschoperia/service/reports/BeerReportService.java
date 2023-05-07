package br.com.chadschoperia.service.reports;

import br.com.chadschoperia.repository.reports.BeerReportRepository;
import br.com.chadschoperia.service.reports.dto.BeerStockReportDto;
import br.com.chadschoperia.service.reports.filters.BaseStockReportFilterDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
