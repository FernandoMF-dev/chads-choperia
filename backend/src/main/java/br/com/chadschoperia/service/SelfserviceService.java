package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.SelfserviceSettings;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.SelfserviceSettingsRepository;
import br.com.chadschoperia.service.dto.ClientCardDto;
import br.com.chadschoperia.service.dto.FoodWeighingDto;
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

	public FoodWeighingDto insertExpense(FoodWeighingDto dto) {
		try {
			ClientCardDto card = clientCardService.findOpenByRfid(dto.getCardRfid());
			SelfserviceSettingsDto settings = getCurrentSettings();
			double value = calculateFinalValue(dto, settings);
			String description = messageSource.getMessage("selfservice.purchase.description", new String[]{dto.getFormatedWeight()}, Locale.getDefault());
			applicationEventPublisher.publishEvent(new AddClientCardExpenseEvent(card.getId(), value, description));
			return dto;
		} catch (EntityNotFoundException ex) {
			throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, ex.getReason());
		}
	}

	public SelfserviceSettingsDto insertNewSettings(SelfserviceSettingsDto dto) {
		SelfserviceSettings entity = selfserviceSettingsMapper.toEntity(dto);
		entity.setId(null);
		entity.setDateTime(LocalDateTime.now());
		entity = repository.save(entity);
		return selfserviceSettingsMapper.toDto(entity);
	}

	public SelfserviceSettingsDto getCurrentSettings() {
		return selfserviceSettingsMapper.toDto(repository.findFirstByOrderByIdDesc());
	}

	private double calculateFinalValue(FoodWeighingDto dto, SelfserviceSettingsDto settings) {
		return dto.getWeight() * settings.getPricePerKg() + settings.getPriceBase();
	}

}
