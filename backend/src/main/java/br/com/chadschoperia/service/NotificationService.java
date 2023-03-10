package br.com.chadschoperia.service;

import br.com.chadschoperia.repository.NotificationRepository;
import br.com.chadschoperia.service.dto.NotificationDto;
import br.com.chadschoperia.service.exception.EntityNotFoundException;
import br.com.chadschoperia.service.mapper.NotificationMapper;
import br.com.chadschoperia.util.MessageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    private final NotificationMapper notificationMapper;

    public List<NotificationDto> findAllByCurrentDateAndItemsNotReplaced() {
        return notificationMapper.toDto(notificationRepository.findAllByCurrentDateAndItemsNotReplaced());
    }

    public NotificationDto findById(Long idNotification) {
        return notificationMapper.toDto(notificationRepository.findById(idNotification)
                .orElseThrow(() -> new EntityNotFoundException(MessageUtil.NOTIFICATION_NOT_FOUND)));
    }

    private void existsById(Long idNotification) {
        if (!notificationRepository.existsById(idNotification)) {
            throw new EntityNotFoundException(MessageUtil.NOTIFICATION_NOT_FOUND);
        }
    }

    public NotificationDto create(NotificationDto notificationDto) {
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
