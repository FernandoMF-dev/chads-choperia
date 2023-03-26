package br.com.chadschoperia.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "beer")
@Getter
@Setter
public class BeerModel implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_beer")
	@SequenceGenerator(name = "sequence_beer", sequenceName = "sequence_beer", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "purchase_price", nullable = false)
	private Double purchasePrice;

	@Column(name = "value_per_mug", nullable = false)
	private Double valuePerMug;

	@Column(name = "stock", nullable = false)
	private Long stock;

}