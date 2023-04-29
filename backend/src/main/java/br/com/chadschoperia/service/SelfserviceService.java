package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.SelfserviceSettings;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.SelfserviceSettingsRepository;
import br.com.chadschoperia.service.dto.ClientCardDto;
import br.com.chadschoperia.service.dto.SelfservicePurchaseDto;
import br.com.chadschoperia.service.dto.SelfserviceSettingsDto;
import br.com.chadschoperia.service.events.AddClientCardExpenseEvent;
import br.com.chadschoperia.service.mapper.SelfserviceSettingsMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Locale;

@Service
@Transactional
@RequiredArgsConstructor
public class SelfserviceService {

	private final SelfserviceSettingsRepository repository;

	private final SelfserviceSettingsMapper selfserviceSettingsMapper;

	private final ClientCardService clientCardService;

	private final MessageSource messageSource;
	private final ApplicationEventPublisher applicationEventPublisher;

	public SelfservicePurchaseDto insertExpense(SelfservicePurchaseDto dto) {
		try {
			ClientCardDto card = clientCardService.findOpenByRfid(dto.getCardId().toString());
			SelfserviceSettingsDto settings = getCurrentSettings();
			double value = calculateFinalValue(dto, settings);
			String formatedValue = String.format("%02.3f", value);
			String description = messageSource.getMessage("selfservice.purchase.description", new String[]{formatedValue}, Locale.getDefault());
			applicationEventPublisher.publishEvent(new AddClientCardExpenseEvent(card.getId(), value, description));
			return dto;
		} catch (EntityNotFoundException ex) {
			throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, ex.getReason());
		}
	}

	public void insertNewSettings(double pricePerKg) {
		SelfserviceSettings entity = new SelfserviceSettings();
		entity.setPricePerKg(pricePerKg);
		entity.setDateTime(LocalDateTime.now());
		repository.save(entity);
	}

	public SelfserviceSettingsDto getCurrentSettings() {
		return selfserviceSettingsMapper.toDto(repository.findFirstByOrderByIdDesc());
	}

	private double calculateFinalValue(SelfservicePurchaseDto dto, SelfserviceSettingsDto settings) {
		return dto.getWeight() * settings.getPricePerKg() + settings.getPriceBase();
	}

}
