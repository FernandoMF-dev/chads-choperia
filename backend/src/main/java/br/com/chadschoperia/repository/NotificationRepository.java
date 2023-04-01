package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.NotificationModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationModel, Long> {

	@Query("SELECT N " +
			" FROM " +
			" NotificationModel N " +
			" WHERE " +
			" N.notificationDate = CURRENT_DATE AND " +
			" N.restockedItem = FALSE ")
	List<NotificationModel> findAllByCurrentDateAndItemsNotReplaced();

}
