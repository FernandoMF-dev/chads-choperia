package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
public class SendEmailDto implements Serializable {

	private String subject;

	private String message;

	private LocalDate periodStartDate;

	private LocalDate periodEndDate;

}
