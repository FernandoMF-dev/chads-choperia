package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.ClientCard;
import br.com.chadschoperia.domain.enums.ClientCardStatusEnum;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.exceptions.ResourceInUseException;
import br.com.chadschoperia.repository.ClientCardRepository;
import br.com.chadschoperia.service.dto.ClientCardDto;
import br.com.chadschoperia.service.dto.ClientCardLinkDto;
import br.com.chadschoperia.service.dto.ClientDto;
import br.com.chadschoperia.service.mapper.ClientCardMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientCardService {

	private final ClientCardRepository repository;
	private final ClientCardMapper mapper;

	private final ClientService clientService;

	private final MessageSource messageSource;

	public ClientCardDto findOpenByRfid(Long rfid) throws EntityNotFoundException {
		ClientCard entity = repository.findByRfid(rfid, ClientCardStatusEnum.OPEN)
				.orElseThrow(() -> new EntityNotFoundException("client_card.not_found"));
		return mapper.toDto(entity);
	}

	public ClientCardDto linkCardToCustomer(ClientCardLinkDto link) {
		validadeCardInUse(link.getRfid());
		validadeClientAlreadyWithCard(link.getIdClient());

		try {
			ClientDto client = clientService.findById(link.getIdClient());
			ClientCardDto dto = new ClientCardDto(client, link.getRfid(), LocalDateTime.now(), ClientCardStatusEnum.OPEN);
			ClientCard entity = mapper.toEntity(dto);

			entity = repository.save(entity);

			return mapper.toDto(entity);
		} catch (EntityNotFoundException e) {
			throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, e.getReason());
		}
	}

	private void validadeCardInUse(Long rfid) throws ResourceInUseException {
		Optional<ClientCard> card = repository.findByRfid(rfid, ClientCardStatusEnum.OPEN);
		if (card.isPresent()) {
			throw new ResourceInUseException(messageSource.getMessage("client_card.in_use", new Object[]{card.get().getClient().getName()}, Locale.getDefault()));
		}
	}

	private void validadeClientAlreadyWithCard(Long idClient) throws ResourceInUseException {
		Optional<ClientCard> card = repository.findByClient(idClient, ClientCardStatusEnum.OPEN);
		if (card.isPresent()) {
			throw new ResourceInUseException(messageSource.getMessage("client_card.client.already_with_card", new Object[]{card.get().getRfid()}, Locale.getDefault()));
		}
	}
}
