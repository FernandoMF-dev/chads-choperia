package br.com.chadschoperia.controller;

import br.com.chadschoperia.service.NotificationService;
import br.com.chadschoperia.service.dto.NotificationDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notificacao")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationDto>> findAllByCurrentDate() {
        return ResponseEntity.ok(notificationService.findAllByCurrentDateAndItemsNotReplaced());
    }

    @GetMapping("/{idNotification}")
    public ResponseEntity<NotificationDto> findById(@PathVariable Long idNotification) {
        return ResponseEntity.ok(notificationService.findById(idNotification));
    }

    @PostMapping
    public ResponseEntity<NotificationDto> create(@Valid @RequestBody NotificationDto notificationDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(notificationService.create(notificationDto));
    }

    @PatchMapping("/{idNotification}")
    public ResponseEntity<Void> replaceItem(@PathVariable Long idNotification) {
        notificationService.replaceItem(idNotification);
        return ResponseEntity.noContent().build();
    }

}
