package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<UserRole, Long> {
}
