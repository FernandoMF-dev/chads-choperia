package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class ViewBeerDto implements Serializable {

	private Long id;

	private String name;

	private Double stock;

	private String rfid;

	public ViewBeerDto(Long id, String name, Double stock, String rfid) {
		this.id = id;
		this.name = name;
		this.stock = stock;
		this.rfid = rfid;
	}
}
