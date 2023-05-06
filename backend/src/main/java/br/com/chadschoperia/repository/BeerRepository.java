package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.Beer;
import br.com.chadschoperia.service.dto.BeerDto;
import br.com.chadschoperia.service.dto.ViewBeerDto;
import br.com.chadschoperia.service.dto.filters.ViewBeerFilterDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BeerRepository extends JpaRepository<Beer, Long> {

	@Query("SELECT new br.com.chadschoperia.service.dto.ViewBeerDto" +
			"(b.id, b.name, b.stock, b.rfid) " +
			" FROM Beer b " +
			" WHERE b.deleted = false " +
			" ORDER BY b.valuePerMug DESC ")
	List<ViewBeerDto> findAllView();

	@Query("SELECT new br.com.chadschoperia.service.dto.BeerDto" +
			"(b.id, b.name, b.purchasePrice, b.valuePerMug, b.stock, b.rfid) " +
			" FROM Beer b " +
			" WHERE b.deleted = false " +
			" AND (:#{#filter.onStock} IS NULL OR :#{#filter.onStock} = (CASE WHEN b.stock > 0 THEN true ELSE false END)) " +
			" ORDER BY b.valuePerMug DESC ")
	List<BeerDto> findAllDto(@Param("filter") ViewBeerFilterDto filter);

	@Query("SELECT new br.com.chadschoperia.service.dto.BeerDto" +
			"(b.id, b.name, b.purchasePrice, b.valuePerMug, b.stock, b.rfid) " +
			" FROM Beer b " +
			" WHERE b.id = :id " +
			" AND b.deleted = false ")
	Optional<BeerDto> findDtoById(@Param("id") Long id);

	Optional<Beer> findByIdAndDeletedIsFalse(Long id);

}
