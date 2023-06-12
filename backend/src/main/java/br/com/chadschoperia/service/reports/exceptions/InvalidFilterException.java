package br.com.chadschoperia.service.reports.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidFilterException extends ResponseStatusException {
	public InvalidFilterException(String reason) {
		super(HttpStatus.BAD_REQUEST, reason);
	}
}
