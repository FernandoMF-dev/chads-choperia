package br.com.chadschoperia.repository;

import br.com.chadschoperia.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel, Long> {
}
