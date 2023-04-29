package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.enums.RestockNotificationStatusEnum;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.exceptions.InvalidStatusException;
import br.com.chadschoperia.repository.RestockNotificationRepository;
import br.com.chadschoperia.service.dto.RestockNotificationDto;
import br.com.chadschoperia.service.mapper.RestockNotificationMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class RestockNotificationService {

	private final RestockNotificationRepository repository;

	private final RestockNotificationMapper mapper;

	public List<RestockNotificationDto> findAllByCurrentDateAndItemsNotReplaced() {
		return repository.findAllDtoOpen();
	}

	public RestockNotificationDto findById(Long idNotification) {
		return mapper.toDto(repository.findById(idNotification)
				.orElseThrow(() -> new EntityNotFoundException("restock_notification.not_found")));
	}

	public RestockNotificationDto create(String replaceItemMessage) {
		RestockNotificationDto dto = new RestockNotificationDto(replaceItemMessage, LocalDateTime.now());

		dto.setOpenDate(LocalDateTime.now());
		return mapper.toDto(repository.save(mapper.toEntity(dto)));
	}

	public void closeNotification(Long idNotification, RestockNotificationStatusEnum status) {
		RestockNotificationDto dto = findById(idNotification);
		validateStatusOpen(dto);
		dto.setCloseDate(LocalDateTime.now());
		dto.setStatus(status);
		repository.save(mapper.toEntity(dto));
	}

	private void validateStatusOpen(RestockNotificationDto dto) {
		if (!Objects.equals(RestockNotificationStatusEnum.OPEN, dto.getStatus())) {
			throw new InvalidStatusException("restock_notification.status.change.not_open");
		}
	}

}
