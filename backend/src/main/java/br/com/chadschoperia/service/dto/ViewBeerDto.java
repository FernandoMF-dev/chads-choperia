package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ViewBeerDto implements Serializable {

	private Long id;

	private String name;

	private Double stock;

	private String rfid;

}
