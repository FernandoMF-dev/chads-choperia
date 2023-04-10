package br.com.chadschoperia.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class EntityAlreadyExistsResource extends ResponseStatusException {

	public EntityAlreadyExistsResource(String reason) {
		super(HttpStatus.BAD_REQUEST, reason);
	}

}
