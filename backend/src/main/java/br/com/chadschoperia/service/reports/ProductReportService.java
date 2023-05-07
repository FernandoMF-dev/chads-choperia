package br.com.chadschoperia.service.reports;

import br.com.chadschoperia.repository.reports.ProductReportRepository;
import br.com.chadschoperia.service.reports.dto.ProductStockReportDto;
import br.com.chadschoperia.service.reports.filters.BaseStockReportFilterDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductReportService extends BaseStockReportService<ProductStockReportDto, BaseStockReportFilterDto> {
	private final ProductReportRepository productReportRepository;

	@Override
	public List<ProductStockReportDto> getStockReportOverTime(BaseStockReportFilterDto filter) {
		validateStockOverTimeFilter(filter);
		return productReportRepository.reportProductStockOverTime(filter);
	}
}
