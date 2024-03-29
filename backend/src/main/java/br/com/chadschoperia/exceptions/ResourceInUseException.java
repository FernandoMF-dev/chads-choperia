package br.com.chadschoperia.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ResourceInUseException extends ResponseStatusException {

	public ResourceInUseException(String reason) {
		super(HttpStatus.BAD_REQUEST, reason);
	}

}
