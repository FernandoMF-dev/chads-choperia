package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
public class ViewUserDto implements Serializable {

	private Long id;

	private String username;

	private String email;

	private String roleName;

	public ViewUserDto(Long id, String username, String email, String roleName) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.roleName = roleName;
	}
}
