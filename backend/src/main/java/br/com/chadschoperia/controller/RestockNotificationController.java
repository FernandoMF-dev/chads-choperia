package br.com.chadschoperia.controller;

import br.com.chadschoperia.configuration.security.RolesUtil;
import br.com.chadschoperia.domain.enums.RestockNotificationStatusEnum;
import br.com.chadschoperia.service.RestockNotificationService;
import br.com.chadschoperia.service.dto.RestockNotificationDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/self-service/restock-notification")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
@RequiredArgsConstructor
public class RestockNotificationController {

	private final RestockNotificationService notificationService;

	@GetMapping
	@Secured({RolesUtil.COOK, RolesUtil.FOOD_MONITOR})
	public ResponseEntity<List<RestockNotificationDto>> findAllOpen() {
		return ResponseEntity.ok(notificationService.findAllOpen());
	}

	@GetMapping("/{idNotification}")
	public ResponseEntity<RestockNotificationDto> findById(@PathVariable Long idNotification) {
		return ResponseEntity.ok(notificationService.findById(idNotification));
	}

	@PostMapping
	@Secured({RolesUtil.FOOD_MONITOR})
	public ResponseEntity<RestockNotificationDto> create(@NotEmpty(message = "restock_notification.item.not_empty")
														 @Size(min = 3, message = "restock_notification.item.min_size")
														 @Size(max = 50, message = "restock_notification.item.max_size")
														 @RequestBody String replaceItemMessage) {
		return ResponseEntity.status(HttpStatus.CREATED).body(notificationService.create(replaceItemMessage));
	}

	@PatchMapping("/repor/{idNotification}")
	@Secured({RolesUtil.COOK})
	public ResponseEntity<Void> replaceItem(@PathVariable Long idNotification) {
		notificationService.closeNotification(idNotification, RestockNotificationStatusEnum.REPLACED);
		return ResponseEntity.noContent().build();
	}

	@PatchMapping("/cancelar/{idNotification}")
	public ResponseEntity<Void> cancel(@PathVariable Long idNotification) {
		notificationService.closeNotification(idNotification, RestockNotificationStatusEnum.CANCELED);
		return ResponseEntity.noContent().build();
	}

}
