package br.com.chadschoperia.domain.entities;

import br.com.chadschoperia.domain.enums.RestockNotificationStatusEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "restock_notification")
@Getter
@Setter
public class RestockNotification implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_restock_notification")
	@SequenceGenerator(name = "sequence_restock_notification", sequenceName = "sequence_restock_notification", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "replace_item_message", nullable = false)
	private String replaceItemMessage;

	@Column(name = "open_date", nullable = false)
	private LocalDateTime openDate;

	@Column(name = "close_date")
	private LocalDateTime closeDate;

	@Column(name = "status", nullable = false)
	@Enumerated(EnumType.STRING)
	private RestockNotificationStatusEnum status = RestockNotificationStatusEnum.OPEN;

}
