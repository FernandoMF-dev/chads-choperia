package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

	boolean existsByCpf(String cpf);

	@Query("SELECT c.cpf " +
			" FROM " +
			" Client c " +
			" WHERE " +
			" c.id = :idClient ")
	String findCpfById(@Param("idClient") Long idClient);

}
