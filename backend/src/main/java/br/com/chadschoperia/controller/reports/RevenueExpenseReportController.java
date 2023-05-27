package br.com.chadschoperia.controller.reports;

import br.com.chadschoperia.configuration.security.RolesUtil;
import br.com.chadschoperia.service.reports.RevenueExpenseReportService;
import br.com.chadschoperia.service.reports.dto.RevenueExpenseReportDto;
import br.com.chadschoperia.service.reports.filters.RevenueExpenseReportFilterDto;
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
@RequestMapping("/api/report/receita-despesa")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequiredArgsConstructor
public class RevenueExpenseReportController {
	private final RevenueExpenseReportService revenueExpenseReportService;

	@GetMapping()
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<List<RevenueExpenseReportDto>> getReportStockOverTime(@Valid RevenueExpenseReportFilterDto filter) {
		return ResponseEntity.ok(revenueExpenseReportService.getRevenueExpenseOverTime(filter));
	}
}
