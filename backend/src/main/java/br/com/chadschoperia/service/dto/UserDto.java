package br.com.chadschoperia.service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserDto implements Serializable {

	private Long id;

	@NotNull(message = "user.username.not_null")
	@NotEmpty(message = "user.username.not_empty")
	@Size(min = 3, message = "user.username.min_size")
	@Size(max = 50, message = "user.username.max_size")
	private String username;

	private String password;

	@NotNull(message = "user.email.not_null")
	@NotEmpty(message = "user.email.not_empty")
	@Email(message = "user.email.valid")
	private String email;

	@NotNull(message = "user.role.not_null")
	private List<Long> idsRole = new ArrayList<>();

	private String roleName;

	public UserDto(Long id, String username, String password, String email) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
	}
}
