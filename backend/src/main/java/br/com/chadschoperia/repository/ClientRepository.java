package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.Client;
import br.com.chadschoperia.service.dto.ViewClientDto;
import br.com.chadschoperia.service.dto.filters.ViewClientFilterDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

	boolean existsByCpf(String cpf);

	@Query("SELECT c.cpf " +
			" FROM " +
			" Client c " +
			" WHERE " +
			" c.id = :idClient ")
	String findCpfById(@Param("idClient") Long idClient);

	@Query("SELECT new br.com.chadschoperia.service.dto.ViewClientDto" +
			"(c.id, c.name, c.telephone, c.email, cc.rfid)" +
			" FROM Client c " +
			" LEFT JOIN ClientCard cc ON cc.client.id = c.id AND cc.status = 'OPEN'" +
			" WHERE (:#{#filter.withCard} IS NULL OR :#{#filter.withCard} = (CASE WHEN cc.id IS NULL THEN false ELSE true END)) ")
	List<ViewClientDto> listDtos(@Param("filter") ViewClientFilterDto filter);

}
