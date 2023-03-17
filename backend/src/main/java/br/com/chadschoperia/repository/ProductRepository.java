package br.com.chadschoperia.repository;

import br.com.chadschoperia.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductModel, Long> {

}
