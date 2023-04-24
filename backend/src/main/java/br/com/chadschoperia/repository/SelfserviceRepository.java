package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.SelfService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SelfserviceRepository extends JpaRepository<SelfService, Long> {

	SelfService findFirstByOrderByIdDesc();

}
