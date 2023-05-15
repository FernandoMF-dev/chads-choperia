package br.com.chadschoperia.domain.entities.historics;

import br.com.chadschoperia.domain.entities.Beer;
import br.com.chadschoperia.domain.enums.HistoricProductActionEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
public class HistoricBeer extends HisoricBaseStock implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_historic_beer")
	@SequenceGenerator(name = "sequence_historic_beer", sequenceName = "sequence_historic_beer", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_beer", referencedColumnName = "id", nullable = false)
	private Beer beer;

	public HistoricBeer(Long beerId, HistoricProductActionEnum action, String description, Double stock, Double totalStock) {
		super(action, description, stock, totalStock);
		this.beer = new Beer(beerId);
	}

	public HistoricBeer(Long beerId, HistoricProductActionEnum action, String description, Double stock, Double totalStock, LocalDateTime dateTime) {
		super(action, description, stock, totalStock, dateTime);
		this.beer = new Beer(beerId);
	}
}
