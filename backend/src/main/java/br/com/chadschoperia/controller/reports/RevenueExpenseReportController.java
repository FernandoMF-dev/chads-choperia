package br.com.chadschoperia.controller.reports;

import br.com.chadschoperia.service.reports.RevenueExpenseReportService;
import br.com.chadschoperia.service.reports.dto.RevenueExpenseReportDto;
import br.com.chadschoperia.service.reports.filters.RevenueExpenseReportFilterDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/report/receita-despesa")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class RevenueExpenseReportController {
	private final RevenueExpenseReportService revenueExpenseReportService;

	@GetMapping()
	public ResponseEntity<List<RevenueExpenseReportDto>> getReportStockOverTime(@Valid RevenueExpenseReportFilterDto filter) {
		return ResponseEntity.ok(revenueExpenseReportService.getRevenueExpenseOverTime(filter));
	}
}
