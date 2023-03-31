package br.com.chadschoperia.service.exception;

import jakarta.validation.ConstraintViolationException;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class ValidationHandler extends ResponseEntityExceptionHandler {

	@Autowired
	private MessageSource messageSource;

	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
																  HttpHeaders headers,
																  HttpStatusCode status,
																  WebRequest request) {
		List<String> errors = ex.getBindingResult().getAllErrors().stream()
				.map(DefaultMessageSourceResolvable::getDefaultMessage)
				.collect(Collectors.toList());

		return getExceptionResponseEntity(HttpStatus.BAD_REQUEST, request, errors);
	}

	@ExceptionHandler({ConstraintViolationException.class})
	public ResponseEntity<Object> handleConstraintViolation(ConstraintViolationException exception, WebRequest request) {
		List<String> validationErrors = exception.getConstraintViolations().stream()
				.map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
				.collect(Collectors.toList());
		return getExceptionResponseEntity(HttpStatus.BAD_REQUEST, request, validationErrors);
	}

	private ResponseEntity<Object> getExceptionResponseEntity(final HttpStatus status, WebRequest request, List<String> errors) {
		final Map<String, Object> body = new LinkedHashMap<>();
		final List<String> errorsMessage = errors.stream().map(this::getMessageSourceIfAvailable).collect(Collectors.toList());
		final String message = getErrorsMessage(status, errorsMessage);
		final String path = request.getDescription(false);

		body.put("timestamp", Instant.now());
		body.put("status", status.value());
		body.put("statusName", status.getReasonPhrase());
		body.put("path", path);
		body.put("erros", errorsMessage);
		body.put("message", message);

		return new ResponseEntity<>(body, status);
	}

	private String getErrorsMessage(HttpStatus status, List<String> errors) {
		if (CollectionUtils.isNotEmpty(errors)) {
			return errors.stream().filter(StringUtils::isNotEmpty).collect(Collectors.joining("; "));
		}

		return status.getReasonPhrase();
	}

	private String getMessageSourceIfAvailable(String value) {
		try {
			return messageSource.getMessage(value, null, Locale.getDefault());
		} catch (NoSuchMessageException e) {
			return value;
		}
	}
}
