package br.com.chadschoperia.service.dto;

import br.com.chadschoperia.util.MessageUtil;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto implements Serializable {

    private Long id;

    @NotNull(message = MessageUtil.VALIDATION_NOTIFICATION_REPLACE_ITEM_MESSAGE_NOT_NULL)
    @NotEmpty(message = MessageUtil.VALIDATION_NOTIFICATION_REPLACE_ITEM_MESSAGE_NOT_EMPTY)
    @Size(min = 3, message = MessageUtil.VALIDATION_NOTIFICATION_REPLACE_ITEM_MESSAGE_MINIMUM_SIZE)
    @Size(max = 50, message = MessageUtil.VALIDATION_NOTIFICATION_REPLACE_ITEM_MESSAGE_MAXIMUM_SIZE)
    private String replaceItemMessage;

    private LocalDate notificationDate;

    private Boolean restockedItem;

}
