package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.Client;
import br.com.chadschoperia.service.dto.ClientDto;
import br.com.chadschoperia.service.dto.ViewClientDto;
import br.com.chadschoperia.service.dto.filters.ViewClientFilterDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {

	@Query("SELECT new br.com.chadschoperia.service.dto.ViewClientDto" +
			"(c.id, c.name, c.telephone, c.email, cc.rfid)" +
			" FROM Client c " +
			" LEFT JOIN ClientCard cc ON cc.client.id = c.id AND (cc.status = 'OPEN' OR cc.status = 'PAID')" +
			" WHERE c.deleted = FALSE " +
			" AND (:#{#filter.withCard} IS NULL OR :#{#filter.withCard} = (CASE WHEN cc.id IS NULL THEN false ELSE true END)) ")
	List<ViewClientDto> findAllView(@Param("filter") ViewClientFilterDto filter);

	@Query("SELECT new br.com.chadschoperia.service.dto.ClientDto" +
			"(c.id, c.name, c.telephone, c.email, c.cpf)" +
			" FROM Client c " +
			" WHERE c.id = :id " +
			" AND c.deleted = FALSE ")
	Optional<ClientDto> findDtoById(@Param("id") Long id);

	Optional<Client> findByIdAndDeletedIsFalse(Long id);

	@Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END " +
			" FROM Client c " +
			" WHERE c.cpf = :cpf " +
			" AND c.deleted = FALSE " +
			" AND (:id IS NULL OR c.id <> :id) ")
	boolean existsDuplicateCpf(@Param("cpf") String cpf, @Param("id") Long id);

	@Query(value = " SELECT DISTINCT C.EMAIL " +
			" FROM CLIENT C " +
			" INNER JOIN CLIENT_CARD CC ON (C.ID = CC.ID_CLIENT) " +
			" WHERE CC.CHECK_OUT >= :periodStartDate AND CC.CHECK_OUT <= :periodEndDate ", nativeQuery = true)
	List<String> findEmailByPurchasePeriod(@Param("periodStartDate") LocalDate periodStartDate, @Param("periodEndDate") LocalDate periodEndDate);

}
