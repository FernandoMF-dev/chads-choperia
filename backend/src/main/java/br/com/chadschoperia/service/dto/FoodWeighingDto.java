package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class FoodWeighingDto {

	private String cardRfid;
	private Double weight = 0.0;

	public String getFormatedWeight() {
		return String.format("%02.3f", this.getWeight());
	}

	public double calculateFinalValue(SelfserviceSettingsDto settings) {
		return this.getWeight() * settings.getPricePerKg() + settings.getPriceBase();
	}
}
