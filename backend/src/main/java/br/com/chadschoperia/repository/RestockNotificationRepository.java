package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.RestockNotification;
import br.com.chadschoperia.service.dto.RestockNotificationDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestockNotificationRepository extends JpaRepository<RestockNotification, Long> {

	@Query("SELECT new br.com.chadschoperia.service.dto.RestockNotificationDto" +
			"(n.id, n.replaceItemMessage, n.openDate, n.closeDate, n.status) " +
			" FROM RestockNotification n " +
			" WHERE n.status = 'OPEN'")
	List<RestockNotificationDto> findAllDtoOpen();

}
