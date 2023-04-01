package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.Beer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BeerRepository extends JpaRepository<Beer, Long> {

	@Query("SELECT b.stock " +
			" FROM " +
			" Beer b " +
			" WHERE " +
			" b.id = :idBeer ")
	Long findStockById(@Param("idBeer") Long idBeer);

}
