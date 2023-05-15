package br.com.chadschoperia.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ViewUserDto implements Serializable {

	private Long id;

	private String username;

	private String email;

	private String roleNames;

	public ViewUserDto(Long id, String username, String email) {
		this.id = id;
		this.username = username;
		this.email = email;
	}
}
