package br.com.chadschoperia.repository.reports;

import br.com.chadschoperia.domain.entities.historics.HistoricBeer;
import br.com.chadschoperia.service.reports.dto.BeerConsumptionReportDto;
import br.com.chadschoperia.service.reports.dto.BeerStockReportDto;
import br.com.chadschoperia.service.reports.filters.BaseStockReportFilterDto;
import br.com.chadschoperia.service.reports.filters.BeerConsumptionReportFilterDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeerReportRepository extends JpaRepository<HistoricBeer, Long> {
	@Query("SELECT new br.com.chadschoperia.service.reports.dto.BeerStockReportDto" +
			"(hb.action, hb.description, b.id, b.name, hb.stock, hb.totalStock, hb.dateTime, b.rfid) " +
			" FROM HistoricBeer hb " +
			" INNER JOIN hb.beer b " +
			" WHERE hb.stock IS NOT NULL " +
			" AND (CAST(CAST(:#{#filter.minDate} AS char) AS timestamp) IS NULL OR CAST(:#{#filter.minDate} as timestamp) <= hb.dateTime) " +
			" AND (CAST(CAST(:#{#filter.maxDate} AS char) AS timestamp) IS NULL OR CAST(:#{#filter.maxDate} as timestamp) >= hb.dateTime) " +
			" AND (b.id IN (:#{#filter.targets})) " +
			" ORDER BY b.name ASC, hb.dateTime DESC ")
	List<BeerStockReportDto> reportBeerStockOverTime(@Param("filter") BaseStockReportFilterDto filter);

	@Query("SELECT new br.com.chadschoperia.service.reports.dto.BeerConsumptionReportDto" +
			"(b.name, SUM(hb.stock)) " +
			" FROM HistoricBeer hb " +
			" INNER JOIN hb.beer b " +
			" WHERE hb.action = 'POUR' " +
			" AND (CAST(CAST(:#{#filter.minDate} AS char) AS timestamp) IS NULL OR CAST(:#{#filter.minDate} as timestamp) <= hb.dateTime) " +
			" AND (CAST(CAST(:#{#filter.maxDate} AS char) AS timestamp) IS NULL OR CAST(:#{#filter.maxDate} as timestamp) >= hb.dateTime) " +
			" GROUP BY hb.stock, b.name " +
			" ORDER BY hb.stock ASC, b.name ASC ")
	List<BeerConsumptionReportDto> reportBeerConsumptionOverTime(@Param("filter")BeerConsumptionReportFilterDto filter);

}
