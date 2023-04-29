package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SelfservicePurchaseDto {

	private Long cardId;
	private Double weight = 0.0;

}