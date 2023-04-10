package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.ClientCard;
import br.com.chadschoperia.domain.enums.ClientCardStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ClientCardRepository extends JpaRepository<ClientCard, Long> {

	@Query("SELECT cc " +
			" FROM ClientCard cc " +
			" WHERE cc.rfid = :rfid " +
			" AND cc.status = :status ")
	Optional<ClientCard> findByRfid(@Param("rfid") Long rfid, @Param("status") ClientCardStatusEnum status);

	@Query("SELECT cc " +
			" FROM ClientCard cc " +
			" WHERE cc.client.id = :idClient " +
			" AND cc.status = :status ")
	Optional<ClientCard> findByClient(@Param("idClient") Long idClient, @Param("status") ClientCardStatusEnum status);

}
