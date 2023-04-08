package br.com.chadschoperia.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class EntityNotFoundException extends ResponseStatusException {

	public EntityNotFoundException(String reason) {
		super(HttpStatus.NOT_FOUND, reason);
	}

	public EntityNotFoundException(HttpStatusCode status, String reason) {
		super(status, reason);
	}
}
