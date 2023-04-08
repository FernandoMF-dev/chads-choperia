package br.com.chadschoperia.service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.br.CPF;

import java.io.Serializable;

@Getter
@Setter
public class ClientDto implements Serializable {

	private Long id;

	@NotNull(message = "client.name.not_null")
	@NotEmpty(message = "client.name.not_empty")
	@Size(min = 3, message = "client.name.min_size")
	@Size(max = 50, message = "client.name.max_size")
	private String name;

	@NotNull(message = "client.telephone.not_null")
	@NotEmpty(message = "client.telephone.not_empty")
	@Size(min = 11, message = "client.telephone.size")
	@Size(max = 11, message = "client.telephone.size")
	private String telephone;

	@NotNull(message = "client.email.not_null")
	@Email(message = "client.email.valid")
	private String email;

	@NotNull(message = "client.cpf.not_null")
	@CPF(message = "client.cpf.valid")
	private String cpf;

}
