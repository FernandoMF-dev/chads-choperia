package br.com.chadschoperia.domain.entities.historics;

import br.com.chadschoperia.domain.entities.Product;
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
@Table(name = "historic_product")
@Getter
@Setter
@NoArgsConstructor
public class HistoricProduct extends HisoricBaseStock implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_historic_product")
	@SequenceGenerator(name = "sequence_historic_product", sequenceName = "sequence_historic_product", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_product", referencedColumnName = "id", nullable = false)
	private Product product;

	public HistoricProduct(Long productId, HistoricProductActionEnum action, String description, Double stock, Double totalStock) {
		super(action, description, stock, totalStock);
		this.product = new Product(productId);
	}

	public HistoricProduct(Long productId, HistoricProductActionEnum action, String description, Double stock, Double totalStock, LocalDateTime dateTime) {
		super(action, description, stock, totalStock, dateTime);
		this.product = new Product(productId);
	}
}
