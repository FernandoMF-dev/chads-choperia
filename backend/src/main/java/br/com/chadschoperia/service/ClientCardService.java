package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.ClientCard;
import br.com.chadschoperia.domain.entities.ClientCardExpense;
import br.com.chadschoperia.domain.enums.ClientCardStatusEnum;
import br.com.chadschoperia.exceptions.BusinessException;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.exceptions.ResourceInUseException;
import br.com.chadschoperia.repository.ClientCardRepository;
import br.com.chadschoperia.service.dto.ClientCardDto;
import br.com.chadschoperia.service.dto.ClientCardLinkDto;
import br.com.chadschoperia.service.dto.ClientCardPaymentDto;
import br.com.chadschoperia.service.dto.ClientDto;
import br.com.chadschoperia.service.mapper.ClientCardMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientCardService {

	private final ClientCardRepository repository;
	private final ClientCardMapper mapper;

	private final ClientService clientService;

	private final MessageSource messageSource;

	public ClientCardDto findOpenByRfid(String rfid) throws EntityNotFoundException {
		ClientCard entity = repository.findByRfidAndStatus(rfid, ClientCardStatusEnum.OPEN)
				.orElseThrow(() -> new EntityNotFoundException("client_card.open.not_found"));
		entity.getExpenses().sort(Comparator.comparing(ClientCardExpense::getDateTime).reversed());
		return mapper.toDto(entity);
	}

	public ClientCardDto findPaidByRfid(String rfid) throws EntityNotFoundException {
		ClientCard entity = repository.findByRfidAndStatus(rfid, ClientCardStatusEnum.PAID)
				.orElseThrow(() -> new EntityNotFoundException("client_card.paid.not_found"));
		return mapper.toDto(entity);
	}

	public ClientCardDto linkCardToCustomer(ClientCardLinkDto link) {
		validadeCardInUse(link.getRfid());
		validadeClientAlreadyWithCard(link.getIdClient());

		try {
			ClientDto client = clientService.findDtoById(link.getIdClient());
			ClientCardDto dto = new ClientCardDto(client, link.getRfid(), LocalDateTime.now(), ClientCardStatusEnum.OPEN);
			return save(dto);
		} catch (EntityNotFoundException e) {
			throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, e.getReason());
		}
	}

	public ClientCardDto completePayment(ClientCardPaymentDto payment) {
		try {
			ClientCardDto dto = findOpenByRfid(payment.getRfid());

			dto.setPayment(payment.getPayment());
			dto.setPaymentMethod(payment.getPaymentMethod());
			dto.setStatus(ClientCardStatusEnum.PAID);

			return save(dto);
		} catch (EntityNotFoundException e) {
			throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, e.getReason());
		}
	}

	public void unlinkCardFromCustomer(String rfid) {
		try {
			ClientCardDto dto = findPaidByRfid(rfid);

			validateFullPayment(dto);

			dto.setCheckOut(LocalDateTime.now());
			dto.setStatus(ClientCardStatusEnum.CLOSED);

			save(dto);
		} catch (EntityNotFoundException e) {
			throw new EntityNotFoundException(HttpStatus.BAD_REQUEST, e.getReason());
		}
	}

	private ClientCardDto save(ClientCardDto dto) {
		ClientCard entity = mapper.toEntity(dto);
		entity = repository.save(entity);
		return mapper.toDto(entity);
	}

	private void validadeCardInUse(String rfid) throws ResourceInUseException {
		Optional<ClientCard> card = repository.findByRfidAndStatus(rfid, ClientCardStatusEnum.OPEN, ClientCardStatusEnum.PAID);
		if (card.isPresent()) {
			throw new ResourceInUseException(messageSource.getMessage("client_card.in_use", new Object[]{card.get().getClient().getUniqueName()}, Locale.getDefault()));
		}
	}

	private void validadeClientAlreadyWithCard(Long idClient) throws ResourceInUseException {
		Optional<ClientCard> card = repository.findByClientAndStatus(idClient, ClientCardStatusEnum.OPEN, ClientCardStatusEnum.PAID);
		if (card.isPresent()) {
			throw new ResourceInUseException(messageSource.getMessage("client_card.client.already_with_card", new Object[]{card.get().getRfid()}, Locale.getDefault()));
		}
	}

	private void validateFullPayment(ClientCardDto dto) {
		if (dto.getChange() < 0 || !Objects.equals(ClientCardStatusEnum.PAID, dto.getStatus())) {
			throw new BusinessException("client_card.not_paid");
		}
	}
}
