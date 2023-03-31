package br.com.chadschoperia.service.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto implements Serializable {

	private Long id;

	@NotNull(message = "notification.item.not_null")
	@NotEmpty(message = "notification.item.not_empty")
	@Size(min = 3, message = "notification.item.min_size")
	@Size(max = 50, message = "notification.item.max_size")
	private String replaceItemMessage;

	private LocalDate notificationDate;

	private Boolean restockedItem;

	public NotificationDto(String replaceItemMessage, LocalDate notificationDate) {
		this.replaceItemMessage = replaceItemMessage;
		this.notificationDate = notificationDate;
		this.restockedItem = Boolean.FALSE;
	}
}
