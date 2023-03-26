package br.com.chadschoperia.util;

public class MessageUtil {

	/* Messages for entities not found */
	public static final String ROLE_NOT_FOUND = "Função não encontrada!";
	public static final String USER_NOT_FOUND = "Usuário não encontrado!";
	public static final String NOTIFICATION_NOT_FOUND = "Notificação não encontrada!";
	public static final String CLIENT_NOT_FOUND = "Cliente não encontrado!";

	/* Messages for business exception */
	public static final String BUSINESS_EXCEPTION_CPF_ALREADY_REGISTERED = "O CPF informado já se encontra cadastrado!";

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


	public static final String VALIDATION_PRODUCT_NAME_NOT_NULL = "O campo nome não pode ser nulo!";
	public static final String VALIDATION_PRODUCT_NAME_NOT_EMPTY = "O campo nome não pode ser vazio!";
	public static final String VALIDATION_PRODUCT_NAME_MINIMUM_SIZE = "O campo nome deve possuir no mínimo 3 caracteres!";
	public static final String VALIDATION_PRODUCT_NAME_MAXIMUM_SIZE = "O campo nome deve possuir no máximo 50 caracteres";
	public static final String VALIDATION_PRODUCT_THRESHOLD_NOT_NULL = "O campo limite de estoque não pode ser nulo!";
	public static final String VALIDATION_PRODUCT_THRESHOLD_NOT_EMPTY = "O campo limite de estoque não pode ser vazio!";
	public static final String VALIDATION_PRODUCT_STOCK_NOT_NULL = "O campo estoque não pode ser nulo!";
	public static final String VALIDATION_PRODUCT_BARCODE_NOT_NULL = "O campo código de barras não pode ser nulo!";


	public static final String VALIDATION_NOTIFICATION_REPLACE_ITEM_MESSAGE_NOT_NULL = "O campo mensagem de reposição do item não pode ser nulo!";
	public static final String VALIDATION_NOTIFICATION_REPLACE_ITEM_MESSAGE_NOT_EMPTY = "O campo mensagem de reposição do item não pode ser vazio!";
	public static final String VALIDATION_NOTIFICATION_REPLACE_ITEM_MESSAGE_MINIMUM_SIZE = "O campo mensagem de reposição do item deve possuir no mínimo 3 caracteres!";
	public static final String VALIDATION_NOTIFICATION_REPLACE_ITEM_MESSAGE_MAXIMUM_SIZE = "O campo mensagem de reposição do item deve possuir no máximo 50 caracteres!";

	public static final String VALIDATION_CLIENT_NAME_NOT_NULL = "O campo nome não pode ser nulo!";
	public static final String VALIDATION_CLIENT_NAME_NOT_EMPTY = "O campo nome não pode ser vazio!";
	public static final String VALIDATION_CLIENT_NAME_MINIMUM_SIZE = "O campo nome deve possuir no mínimo 3 caracteres!";
	public static final String VALIDATION_CLIENT_NAME_MAXIMUM_SIZE = "O campo nome deve possuir no máximo 50 caracteres!";
	public static final String VALIDATION_CLIENT_TELEPHONE_NOT_NULL = "O campo telefone não pode ser nulo!";
	public static final String VALIDATION_CLIENT_TELEPHONE_NOT_EMPTY = "O campo telefone não pode ser vazio!";
	public static final String VALIDATION_CLIENT_TELEPHONE_SIZE = "O campo telefone deve possuir 11 caracteres!";
	public static final String VALIDATION_CLIENT_EMAIL_NOT_NULL = "O campo e-mail não pode ser nulo!";
	public static final String VALIDATION_CLIENT_EMAIL_VALID = "O campo e-mail deve possuir um registro válido!";
	public static final String VALIDATION_CLIENT_CPF_NOT_NULL = "O campo CPF não pode ser nulo!";
	public static final String VALIDATION_CLIENT_CPF_VALID = "O campo CPF deve possuir um registro válido!";

}
