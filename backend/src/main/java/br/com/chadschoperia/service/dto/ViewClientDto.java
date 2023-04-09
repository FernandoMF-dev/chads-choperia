package br.com.chadschoperia.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class ViewClientDto implements Serializable {

	private Long id;
	private String name;
	private String telephone;
	private String email;

	private Boolean withCard;

	public ViewClientDto(Long id, String name, String telephone, String email, Boolean withCard) {
		this.id = id;
		this.name = name;
		this.telephone = telephone;
		this.email = email;
		this.withCard = withCard;
	}
}
