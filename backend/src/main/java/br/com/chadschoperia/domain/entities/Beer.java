package br.com.chadschoperia.domain.entities;

import br.com.chadschoperia.exceptions.OutOfStockException;
import br.com.chadschoperia.service.BeerService;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "beer")
@Getter
@Setter
@NoArgsConstructor
public class Beer implements Serializable {

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
	private Double stock;

	@Column(name = "rfid", nullable = false)
	private String rfid;

	@Column(name = "deleted", nullable = false)
	private Boolean deleted = Boolean.FALSE;

	public Beer(Long id) {
		this.id = id;
	}

	public void setStock(Double stock) {
		if (stock < 0) {
			throw new OutOfStockException("beer.out_of_stock");
		}
		this.stock = stock;
	}

	public void addStock(Double value) {
		this.setStock(this.getStock() + value);
	}

	public double getTotalPurchasePrice(double liters) {
		return liters / BeerService.POUR_QUANTITY * this.getPurchasePrice();
	}
}
