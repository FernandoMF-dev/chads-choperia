package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.Notification;
import br.com.chadschoperia.service.dto.NotificationDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

	@Query("SELECT new br.com.chadschoperia.service.dto.NotificationDto" +
			"(n.id, n.replaceItemMessage, n.openDate, n.closeDate, n.status) " +
			" FROM Notification n " +
			" WHERE n.status = 'OPEN'")
	List<NotificationDto> findAllDtoOpen();

}
