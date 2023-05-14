package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.RevenueExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RevenueExpenseRepository extends JpaRepository<RevenueExpense, Long> {
}
