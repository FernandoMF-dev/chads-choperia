package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.SelfservicePurchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SelfservicePurchaseRepository extends JpaRepository<SelfservicePurchase, Long> {

	SelfservicePurchase findFirstByOrderByIdDesc();

}
