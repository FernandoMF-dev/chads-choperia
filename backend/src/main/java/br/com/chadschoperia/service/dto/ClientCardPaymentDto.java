package br.com.chadschoperia.service.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientCardPaymentDto {
	@NotNull(message = "client_card.rfid.not_null")
	private Long rfid;

	@NotNull(message = "client_card.payment.not_null")
	@PositiveOrZero(message = "client_card.payment.positive")
	private Double payment;

	@NotNull(message = "client_card.payment_method.not_null")
	@NotEmpty(message = "client_card.payment_method.not_empty")
	@Size(min = 3, message = "client_card.payment_method.min_size")
	private String paymentMethod;
}
