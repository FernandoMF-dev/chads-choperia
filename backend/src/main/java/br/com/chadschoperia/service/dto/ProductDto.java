package br.com.chadschoperia.service.dto;

import br.com.chadschoperia.util.MessageUtil;
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

	@NotNull(message = MessageUtil.VALIDATION_PRODUCT_NAME_NOT_NULL)
	@NotEmpty(message = MessageUtil.VALIDATION_PRODUCT_NAME_NOT_EMPTY)
	@Size(min = 3, message = MessageUtil.VALIDATION_PRODUCT_NAME_MINIMUM_SIZE)
	@Size(max = 50, message = MessageUtil.VALIDATION_PRODUCT_NAME_MAXIMUM_SIZE)
	private String name;

	@NotNull(message = MessageUtil.VALIDATION_PRODUCT_THRESHOLD_NOT_NULL)
	@NotEmpty(message = MessageUtil.VALIDATION_PRODUCT_THRESHOLD_NOT_EMPTY)
	private Long restockThreshold;

	@NotNull(message = MessageUtil.VALIDATION_PRODUCT_STOCK_NOT_NULL)
	private Long stock;

	@NotNull(message = MessageUtil.VALIDATION_PRODUCT_BARCODE_NOT_NULL)
	private Long barcode;

}
