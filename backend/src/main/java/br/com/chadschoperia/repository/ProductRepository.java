package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
