package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.User;
import br.com.chadschoperia.service.dto.UserDto;
import br.com.chadschoperia.service.dto.ViewUserDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	@Query("SELECT new br.com.chadschoperia.service.dto.ViewUserDto" +
			"(u.id, u.username, u.email, r.name)" +
			" FROM User u " +
			" INNER JOIN u.role r " +
			" WHERE u.deleted = FALSE ")
	List<ViewUserDto> findAllView();

	@Query("SELECT new br.com.chadschoperia.service.dto.UserDto" +
			"(u.id, u.username, u.password, u.email, r.id, r.name)" +
			" FROM User u " +
			" INNER JOIN u.role r " +
			" WHERE u.id = :id " +
			" AND u.deleted = FALSE ")
	Optional<UserDto> findDtoById(@Param("id") Long id);

	Optional<User> findByIdAndDeletedIsFalse(Long id);
}
