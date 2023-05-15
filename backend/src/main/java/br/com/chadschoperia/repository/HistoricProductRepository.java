package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.historics.HistoricProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricProductRepository extends JpaRepository<HistoricProduct, Long> {
}
