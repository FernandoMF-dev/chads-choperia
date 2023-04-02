package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PourBeerDTO implements Serializable {

	private Long card;

	private Long beer;

}
