package br.com.chadschoperia.repository.reports;

import br.com.chadschoperia.domain.entities.Client;
import br.com.chadschoperia.service.reports.dto.ClientExpesesReportDto;
import br.com.chadschoperia.service.reports.filters.ClientReportFilterDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientReportRepository extends JpaRepository<Client, Long> {
	@Query("SELECT new br.com.chadschoperia.service.reports.dto.ClientExpesesReportDto" +
			"(cce.description, cce.value, cce.dateTime, c, cc)" +
			" FROM ClientCard cc " +
			" INNER JOIN cc.client c " +
			" INNER JOIN cc.expenses cce " +
			" WHERE (CAST(CAST(:#{#filter.minDate} AS char) AS timestamp) IS NULL OR CAST(:#{#filter.minDate} AS timestamp) <= cce.dateTime) " +
			" AND (CAST(CAST(:#{#filter.maxDate} AS char) AS timestamp) IS NULL OR CAST(:#{#filter.maxDate} AS timestamp) >= cce.dateTime) ")
	List<ClientExpesesReportDto> getExpensesOverTime(@Param("filter") ClientReportFilterDto filter);
}
