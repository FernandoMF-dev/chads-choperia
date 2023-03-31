package br.com.chadschoperia.service.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ProductDto implements Serializable {

	private Long id;

	@NotNull(message = "product.name.not_null")
	@NotEmpty(message = "product.name.not_empty")
	@Size(min = 3, message = "product.name.min_size")
	@Size(max = 50, message = "product.name.max_size")
	private String name;

	@NotNull(message = "product.threshold.not_null")
	private Long restockThreshold;

	@NotNull(message = "product.stock.not_null")
	private Long stock;

	@NotNull(message = "product.barcode.not_null")
	private Long barcode;

}
