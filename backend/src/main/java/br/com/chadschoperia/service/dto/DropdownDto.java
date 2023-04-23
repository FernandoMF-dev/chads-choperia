package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class DropdownDto implements Serializable {

	private Long id;

	private String name;

	public DropdownDto(Long id, String name) {
		this.id = id;
		this.name = name;
	}
}
