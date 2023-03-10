package br.com.chadschoperia.repository;

import br.com.chadschoperia.model.ProductModel;
import br.com.chadschoperia.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductModel, Long> {

}
