package br.com.chadschoperia.controller.reports;

import br.com.chadschoperia.controller.reports.interfaces.BaseStockReportController;
import br.com.chadschoperia.service.reports.BeerReportService;
import br.com.chadschoperia.service.reports.dto.BeerConsumptionReportDto;
import br.com.chadschoperia.service.reports.dto.BeerStockReportDto;
import br.com.chadschoperia.service.reports.filters.BaseStockReportFilterDto;
import br.com.chadschoperia.service.reports.filters.BeerConsumptionReportFilterDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/report/chope")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class BeerReportController implements BaseStockReportController<BeerStockReportDto, BaseStockReportFilterDto> {
	private final BeerReportService beerReportService;

	@GetMapping("/stock")
	public ResponseEntity<List<BeerStockReportDto>> getReportStockOverTime(@Valid BaseStockReportFilterDto filter) {
		return ResponseEntity.ok(beerReportService.getStockReportOverTime(filter));
	}

	@GetMapping("/consumption")
	public ResponseEntity<List<BeerConsumptionReportDto>> getConsumptionReportOverTime(@Valid BeerConsumptionReportFilterDto filter) {
		return ResponseEntity.ok(beerReportService.getConsumptionReportOverTime(filter));
	}

}
