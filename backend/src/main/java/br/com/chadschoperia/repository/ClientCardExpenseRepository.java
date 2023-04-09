package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.ClientCardExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientCardExpenseRepository extends JpaRepository<ClientCardExpense, Long> {
}
