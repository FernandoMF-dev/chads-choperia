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
public class RestockNotificationDto implements Serializable {

	private Long id;

	@NotNull(message = "restock_notification.item.not_null")
	@NotEmpty(message = "restock_notification.item.not_empty")
	@Size(min = 3, message = "restock_notification.item.min_size")
	@Size(max = 50, message = "restock_notification.item.max_size")
	private String replaceItemMessage;

	private LocalDateTime openDate;

	private LocalDateTime closeDate;

	private RestockNotificationStatusEnum status;

	public RestockNotificationDto(String replaceItemMessage, LocalDateTime openDate) {
		this.replaceItemMessage = replaceItemMessage;
		this.openDate = openDate;
		this.status = RestockNotificationStatusEnum.OPEN;
	}

	public RestockNotificationDto(Long id, String replaceItemMessage, LocalDateTime openDate, LocalDateTime closeDate, RestockNotificationStatusEnum status) {
		this.id = id;
		this.replaceItemMessage = replaceItemMessage;
		this.openDate = openDate;
		this.closeDate = closeDate;
		this.status = status;
	}
}
