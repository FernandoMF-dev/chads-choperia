package br.com.chadschoperia.service;

import br.com.chadschoperia.exceptions.BusinessException;
import br.com.chadschoperia.repository.ClientRepository;
import br.com.chadschoperia.service.dto.SendEmailDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailService {

	@Value("${spring.mail.username}")
	private String email;

	private final JavaMailSender javaMailSender;

	private final ClientRepository clientRepository;

	public void sendEmail(String subject, String message, String clientEmail) {
		SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
		simpleMailMessage.setFrom(email);
		simpleMailMessage.setTo(clientEmail);
		simpleMailMessage.setSubject(subject);
		simpleMailMessage.setText(message);
		this.javaMailSender.send(simpleMailMessage);
	}

	public void sendEmailToClients(SendEmailDto dto) {
		List<String> clientsEmail = clientRepository.findEmailByPurchasePeriod(dto.getPeriodStartDate(), dto.getPeriodEndDate());
		if (clientsEmail.isEmpty()) {
			throw new BusinessException("Nenhum cliente possui compra no período informado");
		}
		clientsEmail.forEach(email -> {
			sendEmail(dto.getSubject(), dto.getMessage(), email);
		});
	}

}
