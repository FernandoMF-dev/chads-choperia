package br.com.chadschoperia.service;

import br.com.chadschoperia.repository.NotificationRepository;
import br.com.chadschoperia.service.dto.NotificationDto;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.service.mapper.NotificationMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {

	private final NotificationRepository notificationRepository;

	private final NotificationMapper notificationMapper;

	public List<NotificationDto> findAllByCurrentDateAndItemsNotReplaced() {
		return notificationMapper.toDto(notificationRepository.findAllByCurrentDateAndItemsNotReplaced());
	}

	public NotificationDto findById(Long idNotification) {
		return notificationMapper.toDto(notificationRepository.findById(idNotification)
				.orElseThrow(() -> new EntityNotFoundException("notification.not_found")));
	}

	private void existsById(Long idNotification) {
		if (!notificationRepository.existsById(idNotification)) {
			throw new EntityNotFoundException("notification.not_found");
		}
	}

	public NotificationDto create(String replaceItemMessage) {
		NotificationDto notificationDto = new NotificationDto(replaceItemMessage, LocalDate.now());

		notificationDto.setNotificationDate(LocalDate.now());
		notificationDto.setRestockedItem(Boolean.FALSE);
		return notificationMapper.toDto(notificationRepository.save(notificationMapper.toEntity(notificationDto)));
	}

	public void replaceItem(Long idNotification) {
		existsById(idNotification);
		NotificationDto notificationDto = findById(idNotification);
		notificationDto.setRestockedItem(Boolean.TRUE);
		notificationRepository.save(notificationMapper.toEntity(notificationDto));
	}

}
