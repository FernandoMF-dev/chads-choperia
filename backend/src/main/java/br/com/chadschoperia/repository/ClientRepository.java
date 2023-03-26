package br.com.chadschoperia.repository;

import br.com.chadschoperia.model.ClientModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ClientRepository extends JpaRepository<ClientModel, Long> {

	boolean existsByCpf(String cpf);

	@Query("SELECT c.cpf " +
			" FROM " +
			" ClientModel c " +
			" WHERE " +
			" c.id = :idClient ")
	String findCpfById(@Param("idClient") Long idClient);

}
