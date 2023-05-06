package br.com.chadschoperia.controller.reports;

import br.com.chadschoperia.service.reports.BeerReportService;
import br.com.chadschoperia.service.reports.dto.BeerStockReportDto;
import br.com.chadschoperia.service.reports.filters.BeerStockReportFilterDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/report/chop")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class BeerReportController {
	private final BeerReportService beerReportService;

	@GetMapping("/stock")
	public ResponseEntity<List<BeerStockReportDto>> reportBeerStockOverTime(@Valid BeerStockReportFilterDto filter) {
		return ResponseEntity.ok(beerReportService.reportBeerStockOverTime(filter));
	}
}