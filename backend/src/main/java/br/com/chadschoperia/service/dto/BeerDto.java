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
public class BeerDto implements Serializable {

	private Long id;

	@NotNull(message = MessageUtil.VALIDATION_BEER_NAME_NOT_NULL)
	@NotEmpty(message = MessageUtil.VALIDATION_BEER_NAME_NOT_EMPTY)
	@Size(min = 3, message = MessageUtil.VALIDATION_BEER_NAME_MINIMUM_SIZE)
	@Size(max = 50, message = MessageUtil.VALIDATION_BEER_NAME_MAXIMUM_SIZE)
	private String name;

	@NotNull(message = MessageUtil.VALIDATION_BEER_PURCHASE_PRICE_NOT_NULL)
	private Double purchasePrice;

	@NotNull(message = MessageUtil.VALIDATION_BEER_VALUE_PER_MUG)
	private Double valuePerMug;

	private Long stock;

}
