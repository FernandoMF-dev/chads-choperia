package br.com.chadschoperia.service.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class BeerDto implements Serializable {

	private Long id;

	@NotNull(message = "beer.name.not_null")
	@NotEmpty(message = "beer.name.not_empty")
	@Size(min = 3, message = "beer.name.min_size")
	@Size(max = 50, message = "beer.name.max_size")
	private String name;

	@NotNull(message = "beer.purchase.not_null")
	@Positive(message = "beer.purchase.positive")
	private Double purchasePrice;

	@NotNull(message = "beer.mug.not_null")
	@Positive(message = "beer.mug.positive")
	private Double valuePerMug;

	private Double stock;

	public void subtractStock(Double value) {
		this.setStock(this.getStock() - value);
	}
}
