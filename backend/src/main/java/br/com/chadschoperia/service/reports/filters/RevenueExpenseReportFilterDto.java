package br.com.chadschoperia.service.reports.filters;

import br.com.chadschoperia.domain.enums.SellingPointEnum;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class RevenueExpenseReportFilterDto implements Serializable {
	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	private LocalDateTime minDate;

	@DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	private LocalDateTime maxDate;

	private String type;

	@NotEmpty(message = "report.filter.selling_point.not_empty")
	private List<SellingPointEnum> sellingPoints = new ArrayList<>();
}
