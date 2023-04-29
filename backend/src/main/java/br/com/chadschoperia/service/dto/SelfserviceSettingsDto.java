package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class SelfserviceSettingsDto {
	private Long id;
	private Double pricePerKg = 0.0;
	private Double priceBase = 0.0;
	private LocalDateTime dateTime;
}
