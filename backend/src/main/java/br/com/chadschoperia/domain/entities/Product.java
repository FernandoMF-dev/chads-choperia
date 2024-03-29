package br.com.chadschoperia.domain.entities;

import br.com.chadschoperia.exceptions.OutOfStockException;
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
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
public class Product implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_product")
	@SequenceGenerator(name = "sequence_product", sequenceName = "sequence_product", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "restock_threshold", nullable = false)
	private Long restockThreshold;

	@Column(name = "stock", nullable = false)
	private Double stock;

	@Column(name = "purchase_price", nullable = false)
	private Double purchasePrice;

	@Column(name = "barcode", nullable = false)
	private Long barcode;

	@Column(name = "deleted", nullable = false)
	private Boolean deleted = Boolean.FALSE;

	public Product(Long id) {
		this.id = id;
	}

	public void setStock(Double stock) {
		if (stock < 0) {
			throw new OutOfStockException("product.out_of_stock");
		}
		this.stock = stock;
	}

	public void addStock(Double amount) {
		this.setStock(this.getStock() + amount);
	}

	public double getTotalPurchasePrice(double added) {
		return added * this.getPurchasePrice();
	}
}
