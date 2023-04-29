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
@Table(name = "selfservice_purchase")
@Getter
@Setter
public class SelfservicePurchase {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_selfservice_purchase")
	@SequenceGenerator(name = "sequence_selfservice_purchase", sequenceName = "sequence_selfservice_purchase", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "price_per_kg", nullable = false)
	private Double pricePerKg = 0.0;

	@Column(name = "date_time")
	private LocalDateTime dateTime;


}
