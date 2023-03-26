package br.com.chadschoperia.service.dto;

import br.com.chadschoperia.util.MessageUtil;
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

	@NotNull(message = MessageUtil.VALIDATION_CLIENT_NAME_NOT_NULL)
	@NotEmpty(message = MessageUtil.VALIDATION_CLIENT_NAME_NOT_EMPTY)
	@Size(min = 3, message = MessageUtil.VALIDATION_CLIENT_NAME_MINIMUM_SIZE)
	@Size(max = 50, message = MessageUtil.VALIDATION_CLIENT_NAME_MAXIMUM_SIZE)
	private String name;

	@NotNull(message = MessageUtil.VALIDATION_CLIENT_TELEPHONE_NOT_NULL)
	@NotEmpty(message = MessageUtil.VALIDATION_CLIENT_TELEPHONE_NOT_EMPTY)
	@Size(min = 11, message = MessageUtil.VALIDATION_CLIENT_TELEPHONE_SIZE)
	@Size(max = 11, message = MessageUtil.VALIDATION_CLIENT_TELEPHONE_SIZE)
	private String telephone;

	@NotNull(message = MessageUtil.VALIDATION_CLIENT_EMAIL_NOT_NULL)
	@Email(message = MessageUtil.VALIDATION_CLIENT_EMAIL_VALID)
	private String email;

	@NotNull(message = MessageUtil.VALIDATION_CLIENT_CPF_NOT_NULL)
	@CPF(message = MessageUtil.VALIDATION_CLIENT_CPF_VALID)
	private String cpf;

}
