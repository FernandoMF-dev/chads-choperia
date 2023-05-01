package br.com.chadschoperia.controller.reports;

import br.com.chadschoperia.service.reports.BeerReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/report/chop")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class BeerReportController {
	private final BeerReportService beerReportService;
}
