package br.com.chadschoperia.service.dto;

import br.com.chadschoperia.domain.enums.PaymentMethodEnum;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClientCardPaymentDto {
	@NotNull(message = "client_card.rfid.not_null")
	private String rfid;

	@NotNull(message = "client_card.payment.not_null")
	@PositiveOrZero(message = "client_card.payment.positive")
	private Double payment;

	@NotNull(message = "client_card.payment_method.not_null")
	@NotEmpty(message = "client_card.payment_method.not_empty")
	private PaymentMethodEnum paymentMethod;
}
