package br.com.chadschoperia.service.dto;

import br.com.chadschoperia.domain.enums.RestockNotificationStatusEnum;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class NotificationDto implements Serializable {

	private Long id;

	@NotNull(message = "notification.item.not_null")
	@NotEmpty(message = "notification.item.not_empty")
	@Size(min = 3, message = "notification.item.min_size")
	@Size(max = 50, message = "notification.item.max_size")
	private String replaceItemMessage;

	private LocalDateTime openDate;

	private LocalDateTime closeDate;

	private RestockNotificationStatusEnum status;

	public NotificationDto(String replaceItemMessage, LocalDateTime openDate) {
		this.replaceItemMessage = replaceItemMessage;
		this.openDate = openDate;
		this.status = RestockNotificationStatusEnum.OPEN;
	}

	public NotificationDto(Long id, String replaceItemMessage, LocalDateTime openDate, LocalDateTime closeDate, RestockNotificationStatusEnum status) {
		this.id = id;
		this.replaceItemMessage = replaceItemMessage;
		this.openDate = openDate;
		this.closeDate = closeDate;
		this.status = status;
	}
}
