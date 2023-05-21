package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	List<User> findAllByDeletedIsFalse();

	Optional<User> findByIdAndDeletedIsFalse(Long id);

	Optional<User> findByUsername(String username);

}
