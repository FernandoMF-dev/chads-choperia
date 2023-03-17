package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class ViewUserDto implements Serializable {

	private Long id;

	private String username;

	private String email;

	private String roleName;

}
