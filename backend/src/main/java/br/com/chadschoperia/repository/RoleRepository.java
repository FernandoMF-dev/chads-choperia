package br.com.chadschoperia.repository;

import br.com.chadschoperia.model.RoleModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleModel, Long> {
}
