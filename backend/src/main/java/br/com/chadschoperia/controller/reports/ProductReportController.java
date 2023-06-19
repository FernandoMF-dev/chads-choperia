package br.com.chadschoperia.controller.reports;

import br.com.chadschoperia.configuration.security.RolesUtil;
import br.com.chadschoperia.controller.reports.interfaces.BaseStockReportController;
import br.com.chadschoperia.service.reports.ProductReportService;
import br.com.chadschoperia.service.reports.dto.ProductStockReportDto;
import br.com.chadschoperia.service.reports.filters.BaseStockReportFilterDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/report/produto")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequiredArgsConstructor
public class ProductReportController implements BaseStockReportController<ProductStockReportDto, BaseStockReportFilterDto> {
	private final ProductReportService productReportService;

	@GetMapping("/stock")
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<List<ProductStockReportDto>> getReportStockOverTime(@Valid BaseStockReportFilterDto filter) {
		return ResponseEntity.ok(productReportService.getStockReportOverTime(filter));
	}
}
