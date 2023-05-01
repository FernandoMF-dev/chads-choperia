package br.com.chadschoperia.service;

import br.com.chadschoperia.service.dto.SendEmailDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

	@Value("${spring.mail.username}")
	private String email;

	private final JavaMailSender javaMailSender;

	public void sendEmail(SendEmailDto sendEmailDto) {
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		simpleMailMessage.setFrom(email);
		simpleMailMessage.setTo(email);
		simpleMailMessage.setSubject(sendEmailDto.getSubject());
		simpleMailMessage.setText(sendEmailDto.getMessage());
		this.javaMailSender.send(simpleMailMessage);
	}

}
