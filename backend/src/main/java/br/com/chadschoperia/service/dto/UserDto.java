package br.com.chadschoperia.service.dto;

import br.com.chadschoperia.util.MessageUtil;
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

    @NotNull(message = MessageUtil.VALIDATION_USER_USERNAME_NOT_NULL)
    @NotEmpty(message = MessageUtil.VALIDATION_USER_USERNAME_NOT_EMPTY)
    @Size(min = 3, message = MessageUtil.VALIDATION_USER_USERNAME_MINIMUM_SIZE)
    @Size(max = 50, message = MessageUtil.VALIDATION_USER_USERNAME_MAXIMUM_SIZE)
    private String username;

    @NotNull(message = MessageUtil.VALIDATION_USER_PASSWORD_NOT_NULL)
    @NotEmpty(message = MessageUtil.VALIDATION_USER_PASSWORD_NOT_EMPTY)
    @Size(min = 3, message = MessageUtil.VALIDATION_USER_PASSWORD_MINIMUM_SIZE)
    @Size(max = 50, message = MessageUtil.VALIDATION_USER_PASSWORD_MAXIMUM_SIZE)
    private String password;

    @NotNull(message = MessageUtil.VALIDATION_USER_EMAIL_NOT_NULL)
    @NotEmpty(message = MessageUtil.VALIDATION_USER_EMAIL_NOT_EMPTY)
    @Email(message = MessageUtil.VALIDATION_USER_EMAIL_VALID)
    private String email;

    @NotNull(message = MessageUtil.VALIDATION_USER_ID_ROLE_NOT_NULL)
    private Long idRole;

    private String roleName;

}
