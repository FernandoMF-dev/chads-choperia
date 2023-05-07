package br.com.chadschoperia.controller.reports.interfaces;

import br.com.chadschoperia.service.reports.dto.BaseStockReportDto;
import br.com.chadschoperia.service.reports.filters.BaseStockReportFilterDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface BaseStockReportController<DTO extends BaseStockReportDto, F extends BaseStockReportFilterDto> {
	ResponseEntity<List<DTO>> getReportStockOverTime(@Valid F filter);
}
