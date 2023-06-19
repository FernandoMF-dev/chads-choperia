package br.com.chadschoperia.controller.reports;

import br.com.chadschoperia.configuration.security.RolesUtil;
import br.com.chadschoperia.service.reports.ClientReportService;
import br.com.chadschoperia.service.reports.dto.ClientExpesesReportDto;
import br.com.chadschoperia.service.reports.filters.ClientExpesesReportFilterDto;
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
@RequestMapping("/api/report/client")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequiredArgsConstructor
public class ClientReportController {
	private final ClientReportService clientReportService;

	@GetMapping("/expenses")
	@Secured({RolesUtil.ADMIN})
	public ResponseEntity<List<ClientExpesesReportDto>> getExpensesOverTime(@Valid ClientExpesesReportFilterDto filter) {
		return ResponseEntity.ok(clientReportService.getExpensesOverTime(filter));
	}
}
