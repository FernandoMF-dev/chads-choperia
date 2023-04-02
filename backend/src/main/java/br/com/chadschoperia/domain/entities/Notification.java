package br.com.chadschoperia.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "notification")
@Getter
@Setter
public class Notification implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_notification")
	@SequenceGenerator(name = "sequence_notification", sequenceName = "sequence_notification", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "replace_item_message", nullable = false)
	private String replaceItemMessage;

	@Column(name = "notification_date", nullable = false)
	private LocalDate notificationDate;

	@Column(name = "restocked_item", nullable = false)
	private Boolean restockedItem;

}
