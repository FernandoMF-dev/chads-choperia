package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.Beer;
import br.com.chadschoperia.service.dto.BeerDto;
import br.com.chadschoperia.service.dto.ViewBeerDto;
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
			" WHERE b.deleted = false ")
	List<ViewBeerDto> findAllView();

	@Query("SELECT new br.com.chadschoperia.service.dto.BeerDto" +
			"(b.id, b.name, b.purchasePrice, b.valuePerMug, b.stock, b.rfid) " +
			" FROM Beer b " +
			" WHERE b.deleted = false ")
	List<BeerDto> findAllDto();

	@Query("SELECT new br.com.chadschoperia.service.dto.BeerDto" +
			"(b.id, b.name, b.purchasePrice, b.valuePerMug, b.stock, b.rfid) " +
			" FROM Beer b " +
			" WHERE b.id = :id " +
			" AND b.deleted = false ")
	Optional<BeerDto> findDtoById(@Param("id") Long id);

	@Query("SELECT b.stock " +
			" FROM Beer b " +
			" WHERE b.id = :idBeer " +
			" AND b.deleted = FALSE ")
	Double findStockById(@Param("idBeer") Long idBeer);

}
