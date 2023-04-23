package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.Product;
import br.com.chadschoperia.service.dto.ProductDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	@Query("SELECT new br.com.chadschoperia.service.dto.ProductDto" +
			"(p.id, p.name, p.restockThreshold, p.stock, p.barcode)" +
			" FROM Product p " +
			" WHERE p.deleted = FALSE ")
	List<ProductDto> findAllDto();

	@Query("SELECT new br.com.chadschoperia.service.dto.ProductDto" +
			"(p.id, p.name, p.restockThreshold, p.stock, p.barcode)" +
			" FROM Product p " +
			" WHERE p.id = :id " +
			" AND p.deleted = FALSE ")
	Optional<ProductDto> findDtoById(@Param("id") Long id);

	Optional<Product> findByIdAndDeletedIsFalse(Long id);

}
