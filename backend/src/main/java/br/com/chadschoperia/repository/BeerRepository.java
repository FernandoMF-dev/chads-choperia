package br.com.chadschoperia.repository;

import br.com.chadschoperia.model.BeerModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BeerRepository extends JpaRepository<BeerModel, Long> {

	@Query("SELECT b.stock " +
			" FROM " +
			" BeerModel b " +
			" WHERE " +
			" b.id = :idBeer ")
	Long findStockById(@Param("idBeer") Long idBeer);

}
