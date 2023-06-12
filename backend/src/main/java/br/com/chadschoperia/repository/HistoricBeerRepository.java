package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.historics.HistoricBeer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoricBeerRepository extends JpaRepository<HistoricBeer, Long> {
}
