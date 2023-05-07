package br.com.chadschoperia.service.dto.filters;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ViewBeerFilterDto implements Serializable {
	private Boolean onStock;
}
