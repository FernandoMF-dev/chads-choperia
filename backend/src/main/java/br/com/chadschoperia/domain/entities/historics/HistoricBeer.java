package br.com.chadschoperia.domain.entities.historics;

import br.com.chadschoperia.domain.entities.Beer;
import br.com.chadschoperia.domain.enums.HistoricBeerActionEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "historic_beer")
@Getter
@Setter
@NoArgsConstructor
public class HistoricBeer implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_historic_beer")
	@SequenceGenerator(name = "sequence_historic_beer", sequenceName = "sequence_historic_beer", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "description")
	private String description;

	@Column(name = "stock")
	private Double stock;

	@Column(name = "action", nullable = false)
	@Enumerated(EnumType.STRING)
	private HistoricBeerActionEnum action;

	@Column(name = "date_time", nullable = false)
	private LocalDateTime dateTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_beer", referencedColumnName = "id", nullable = false)
	private Beer beer;

	public HistoricBeer(Long beerId, String description, Double stock, HistoricBeerActionEnum action) {
		this.beer = new Beer(beerId);
		this.description = description;
		this.stock = stock;
		this.action = action;
		this.dateTime = LocalDateTime.now();
	}

	public HistoricBeer(Long beerId, String description, Double stock, HistoricBeerActionEnum action, LocalDateTime dateTime) {
		this.beer = new Beer(beerId);
		this.description = description;
		this.stock = stock;
		this.action = action;
		this.dateTime = dateTime;
	}
}
