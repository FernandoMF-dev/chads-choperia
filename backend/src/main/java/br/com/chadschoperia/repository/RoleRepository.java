package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.UserRole;
import br.com.chadschoperia.service.dto.DropdownDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<UserRole, Long> {
	@Query("SELECT new br.com.chadschoperia.service.dto.DropdownDto" +
			"(ur.id, ur.name) " +
			" FROM UserRole ur " +
			" WHERE ur.deleted = FALSE ")
	List<DropdownDto> findAllDropdown();

	@Query("SELECT new br.com.chadschoperia.service.dto.DropdownDto" +
			"(ur.id, ur.name) " +
			" FROM UserRole ur " +
			" WHERE ur.id = :id " +
			" AND ur.deleted = FALSE ")
	Optional<DropdownDto> findDropdownById(@Param("id") Long id);
}
