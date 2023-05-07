package br.com.chadschoperia.controller.reports;

import br.com.chadschoperia.controller.reports.interfaces.BaseStockReportController;
import br.com.chadschoperia.service.reports.ProductReportService;
import br.com.chadschoperia.service.reports.dto.ProductStockReportDto;
import br.com.chadschoperia.service.reports.filters.BaseStockReportFilterDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/report/produto")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class ProductReportController implements BaseStockReportController<ProductStockReportDto, BaseStockReportFilterDto> {
	private final ProductReportService productReportService;

	@GetMapping("/stock")
	public ResponseEntity<List<ProductStockReportDto>> getReportStockOverTime(@Valid BaseStockReportFilterDto filter) {
		return ResponseEntity.ok(productReportService.getStockReportOverTime(filter));
	}
}
