package br.com.chadschoperia.repository.reports;

import br.com.chadschoperia.domain.entities.historics.HistoricBeer;
import br.com.chadschoperia.service.reports.dto.BeerStockReportDto;
import br.com.chadschoperia.service.reports.filters.BeerStockReportFilterDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BeerReportRepository extends JpaRepository<HistoricBeer, Long> {
	@Query("SELECT new br.com.chadschoperia.service.reports.dto.BeerStockReportDto" +
			"(hb.action, hb.description, b.id, b.name, b.rfid, hb.stock, hb.totalStock, hb.dateTime) " +
			" FROM HistoricBeer hb " +
			" INNER JOIN hb.beer b " +
			" WHERE hb.stock IS NOT NULL " +
			" AND (CAST(:#{#filter.minDate} as timestamp) IS NULL OR CAST(:#{#filter.minDate} as timestamp) <= hb.dateTime) " +
			" AND (CAST(:#{#filter.maxDate} as timestamp) IS NULL OR CAST(:#{#filter.maxDate} as timestamp) >= hb.dateTime) " +
			" AND (b.id IN (:#{#filter.beers})) " +
			" ORDER BY b.name ASC, hb.dateTime DESC ")
	List<BeerStockReportDto> reportBeerStockOverTime(@Param("filter") BeerStockReportFilterDto filter);
}
