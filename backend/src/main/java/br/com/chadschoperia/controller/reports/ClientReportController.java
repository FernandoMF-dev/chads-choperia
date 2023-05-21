package br.com.chadschoperia.controller.reports;

import br.com.chadschoperia.service.reports.ClientReportService;
import br.com.chadschoperia.service.reports.dto.ClientExpesesReportDto;
import br.com.chadschoperia.service.reports.filters.ClientExpesesReportFilterDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/report/client")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class ClientReportController {
	private final ClientReportService clientReportService;

	@GetMapping("/expenses")
	public ResponseEntity<List<ClientExpesesReportDto>> getExpensesOverTime(@Valid ClientExpesesReportFilterDto filter) {
		return ResponseEntity.ok(clientReportService.getExpensesOverTime(filter));
	}
}
