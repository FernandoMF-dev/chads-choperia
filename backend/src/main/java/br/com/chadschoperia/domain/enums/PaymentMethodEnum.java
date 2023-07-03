package br.com.chadschoperia.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PaymentMethodEnum {
	CASH("Dinheiro"),
	CREDIT_CARD("Cartão - Crédito"),
	DEBT_CARD("Cartão - Débito"),
	PIX("PIX"),
	PICPAY("PicPay"),
	OTHER("Outro");

	private final String label;
}
