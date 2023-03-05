package br.com.chadschoperia.util;

public class MessageUtil {

    /* Messages for entities not found */
    public static final String ROLE_NOT_FOUND = "Função não encontrada!";
    public static final String USER_NOT_FOUND = "Usuário não encontrado!";

    /* Messages for validation in dto */
    public static final String VALIDATION_USER_USERNAME_NOT_NULL = "O campo usuário não pode ser nulo!";
    public static final String VALIDATION_USER_USERNAME_NOT_EMPTY = "O campo usuário não pode ser vazio!";
    public static final String VALIDATION_USER_USERNAME_MINIMUM_SIZE = "O campo usuário deve possuir no mínimo 3 caracteres!";
    public static final String VALIDATION_USER_USERNAME_MAXIMUM_SIZE = "O campo usuário deve possuir no máximo 50 caracteres";
    public static final String VALIDATION_USER_PASSWORD_NOT_NULL = "O campo senha não pode ser nulo!";
    public static final String VALIDATION_USER_PASSWORD_NOT_EMPTY = "O campo senha não pode ser vazio!";
    public static final String VALIDATION_USER_PASSWORD_MINIMUM_SIZE = "O campo senha deve possuir no mínimo 3 caracteres!";
    public static final String VALIDATION_USER_PASSWORD_MAXIMUM_SIZE = "O campo senha deve possuir no máximo 50 caracteres!";
    public static final String VALIDATION_USER_EMAIL_NOT_NULL = "O campo e-mail não pode ser nulo!";
    public static final String VALIDATION_USER_EMAIL_NOT_EMPTY = "O campo e-mail não pode ser vazio!";
    public static final String VALIDATION_USER_EMAIL_VALID = "O campo e-mail deve possuir um registro válido!";
    public static final String VALIDATION_USER_ID_ROLE_NOT_NULL = "O campo função não pode ser nulo!";

}
