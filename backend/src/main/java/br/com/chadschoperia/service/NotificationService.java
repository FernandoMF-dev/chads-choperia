package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.enums.RestockNotificationStatusEnum;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.exceptions.InvalidStatusException;
import br.com.chadschoperia.repository.NotificationRepository;
import br.com.chadschoperia.service.dto.NotificationDto;
import br.com.chadschoperia.service.mapper.NotificationMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {

	private final NotificationRepository notificationRepository;

	private final NotificationMapper notificationMapper;

	public List<NotificationDto> findAllByCurrentDateAndItemsNotReplaced() {
		return notificationRepository.findAllDtoOpen();
	}

	public NotificationDto findById(Long idNotification) {
		return notificationMapper.toDto(notificationRepository.findById(idNotification)
				.orElseThrow(() -> new EntityNotFoundException("notification.not_found")));
	}

	public NotificationDto create(String replaceItemMessage) {
		NotificationDto notificationDto = new NotificationDto(replaceItemMessage, LocalDateTime.now());

		notificationDto.setOpenDate(LocalDateTime.now());
		return notificationMapper.toDto(notificationRepository.save(notificationMapper.toEntity(notificationDto)));
	}

	public void closeNotification(Long idNotification, RestockNotificationStatusEnum status) {
		NotificationDto notificationDto = findById(idNotification);
		validateStatusOpen(notificationDto);
		notificationDto.setCloseDate(LocalDateTime.now());
		notificationDto.setStatus(status);
		notificationRepository.save(notificationMapper.toEntity(notificationDto));
	}

	private void validateStatusOpen(NotificationDto notificationDto) {
		if (!Objects.equals(RestockNotificationStatusEnum.OPEN, notificationDto.getStatus())) {
			throw new InvalidStatusException("notification.status.change.not_open");
		}
	}

}
