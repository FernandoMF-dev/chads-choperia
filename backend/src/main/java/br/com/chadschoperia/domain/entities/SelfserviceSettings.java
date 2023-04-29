package br.com.chadschoperia.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "selfservice_settings")
@Getter
@Setter
public class SelfserviceSettings {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_selfservice_settings")
	@SequenceGenerator(name = "sequence_selfservice_settings", sequenceName = "sequence_selfservice_settings", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "price_per_kg", nullable = false)
	private Double pricePerKg = 0.0;

	@Column(name = "price_base", nullable = false)
	private Double priceBase = 0.0;

	@Column(name = "date_time")
	private LocalDateTime dateTime;


}
