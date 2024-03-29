package br.com.chadschoperia.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidStatusException extends ResponseStatusException {

	public InvalidStatusException(String reason) {
		super(HttpStatus.CONFLICT, reason);
	}

}
