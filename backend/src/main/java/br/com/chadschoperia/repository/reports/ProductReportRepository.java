package br.com.chadschoperia.repository.reports;

import br.com.chadschoperia.domain.entities.historics.HistoricProduct;
import br.com.chadschoperia.service.reports.dto.ProductStockReportDto;
import br.com.chadschoperia.service.reports.filters.BaseStockReportFilterDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductReportRepository extends JpaRepository<HistoricProduct, Long> {
	@Query("SELECT new br.com.chadschoperia.service.reports.dto.ProductStockReportDto" +
			"(hp.action, hp.description, p.id, p.name, hp.stock, hp.totalStock, hp.dateTime, p.barcode) " +
			" FROM HistoricProduct hp " +
			" INNER JOIN hp.product p " +
			" WHERE hp.stock IS NOT NULL " +
			" AND (CAST(:#{#filter.minDate} AS timestamp) IS NULL OR CAST(:#{#filter.minDate} as timestamp) <= hp.dateTime) " +
			" AND (CAST(:#{#filter.maxDate} AS timestamp) IS NULL OR CAST(:#{#filter.maxDate} as timestamp) >= hp.dateTime) " +
			" AND (p.id IN (:#{#filter.targets})) " +
			" ORDER BY p.name ASC, hp.dateTime DESC ")
	List<ProductStockReportDto> reportProductStockOverTime(@Param("filter") BaseStockReportFilterDto filter);
}
