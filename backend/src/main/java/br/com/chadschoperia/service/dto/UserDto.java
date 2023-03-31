package br.com.chadschoperia.service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class UserDto implements Serializable {

	private Long id;

	@NotNull(message = "user.username.not_null")
	@NotEmpty(message = "user.username.not_empty")
	@Size(min = 3, message = "user.username.min_size")
	@Size(max = 50, message = "user.username.max_size")
	private String username;

	@NotNull(message = "user.password.not_null")
	@NotEmpty(message = "user.password.not_empty")
	@Size(min = 3, message = "user.password.min_size")
	@Size(max = 50, message = "user.password.max_size")
	private String password;

	@NotNull(message = "user.email.not_null")
	@NotEmpty(message = "user.email.not_empty")
	@Email(message = "user.email.valid")
	private String email;

	@NotNull(message = "user.role.not_null")
	private Long idRole;

	private String roleName;

}
