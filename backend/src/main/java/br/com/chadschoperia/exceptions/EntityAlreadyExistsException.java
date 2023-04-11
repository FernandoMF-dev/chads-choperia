package br.com.chadschoperia.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class EntityAlreadyExistsException extends ResponseStatusException {

	public EntityAlreadyExistsException(String reason) {
		super(HttpStatus.BAD_REQUEST, reason);
	}

}
