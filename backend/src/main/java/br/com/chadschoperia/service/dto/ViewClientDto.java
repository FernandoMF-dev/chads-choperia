package br.com.chadschoperia.service.dto;

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

	private String currentCardRfid;

	public ViewClientDto(Long id, String name, String telephone, String email, String currentCardRfid) {
		this.id = id;
		this.name = name;
		this.telephone = telephone;
		this.email = email;
		this.currentCardRfid = currentCardRfid;
	}
}
