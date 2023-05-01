package br.com.chadschoperia.controller;

import br.com.chadschoperia.service.EmailService;
import br.com.chadschoperia.service.dto.SendEmailDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/email")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class EmailController {

	private final EmailService emailService;

	@PostMapping
	public ResponseEntity<Void> sendEmail(@RequestBody SendEmailDto sendEmailDto) {
		emailService.sendEmailToClients(sendEmailDto);
		return ResponseEntity.ok().build();
	}

}
