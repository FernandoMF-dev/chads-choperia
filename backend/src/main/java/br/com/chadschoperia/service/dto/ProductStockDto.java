package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ProductStockDto implements Serializable {

	private Long productId;

	private Double amount;

}
