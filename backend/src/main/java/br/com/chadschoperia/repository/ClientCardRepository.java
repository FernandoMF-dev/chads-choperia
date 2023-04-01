package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.ClientCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientCardRepository extends JpaRepository<ClientCard, Long> {
}
