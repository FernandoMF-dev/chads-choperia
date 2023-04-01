package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
