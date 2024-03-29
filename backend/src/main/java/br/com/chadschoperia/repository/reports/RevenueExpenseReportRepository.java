package br.com.chadschoperia.repository.reports;

import br.com.chadschoperia.domain.entities.RevenueExpense;
import br.com.chadschoperia.domain.enums.RevenueExpenseTypeEnum;
import br.com.chadschoperia.service.reports.dto.RevenueExpenseReportDto;
import br.com.chadschoperia.service.reports.filters.RevenueExpenseReportFilterDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RevenueExpenseReportRepository extends JpaRepository<RevenueExpense, Long> {
	@Query("SELECT new br.com.chadschoperia.service.reports.dto.RevenueExpenseReportDto" +
			"(re.type, re.description, re.dateTime, re.value, re.sellingPoint)" +
			" FROM RevenueExpense re " +
			" WHERE (CAST(CAST(:#{#filter.minDate} AS char) AS timestamp) IS NULL OR CAST(:#{#filter.minDate} AS timestamp) <= re.dateTime) " +
			" AND (CAST(CAST(:#{#filter.maxDate} AS char) AS timestamp) IS NULL OR CAST(:#{#filter.maxDate} AS timestamp) >= re.dateTime) " +
			" AND(:filterType IS NULL OR :filterType  = re.type) " +
			" AND(re.sellingPoint IN (:#{#filter.sellingPoints})) " +
			" ORDER BY re.dateTime DESC ")
	List<RevenueExpenseReportDto> getRevenueExpenseOverTime(@Param("filter") RevenueExpenseReportFilterDto filter,
															@Param("filterType") RevenueExpenseTypeEnum filterType);
}
