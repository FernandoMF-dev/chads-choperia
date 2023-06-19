package br.com.chadschoperia.controller.reports;

import br.com.chadschoperia.configuration.security.RolesUtil;
import br.com.chadschoperia.controller.reports.interfaces.BaseStockReportController;
import br.com.chadschoperia.service.reports.BeerReportService;
import br.com.chadschoperia.service.reports.dto.BeerConsumptionReportDto;
import br.com.chadschoperia.service.reports.dto.BeerStockReportDto;
import br.com.chadschoperia.service.reports.filters.BaseStockReportFilterDto;
import br.com.chadschoperia.service.reports.filters.BeerConsumptionReportFilterDto;
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
@RequestMapping("/api/report/chope")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequiredArgsConstructor
public class BeerReportController implements BaseStockReportController<BeerStockReportDto, BaseStockReportFilterDto> {
	private final BeerReportService beerReportService;

	@GetMapping("/stock")
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<List<BeerStockReportDto>> getReportStockOverTime(@Valid BaseStockReportFilterDto filter) {
		return ResponseEntity.ok(beerReportService.getStockReportOverTime(filter));
	}

	@GetMapping("/consumption")
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<List<BeerConsumptionReportDto>> getConsumptionReportOverTime(@Valid BeerConsumptionReportFilterDto filter) {
		return ResponseEntity.ok(beerReportService.getConsumptionReportOverTime(filter));
	}

}
