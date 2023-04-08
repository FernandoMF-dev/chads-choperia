package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.ClientCard;
import br.com.chadschoperia.domain.enums.ClientCardStatusEnum;
import br.com.chadschoperia.repository.ClientCardRepository;
import br.com.chadschoperia.service.dto.ClientCardDto;
import br.com.chadschoperia.service.exception.EntityNotFoundException;
import br.com.chadschoperia.service.mapper.ClientCardMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientCardService {

	private final ClientCardRepository repository;
	private final ClientCardMapper mapper;

	public ClientCardDto findOpenByRfid(Long rfid) {
		ClientCard entity = repository.findByRfid(rfid, ClientCardStatusEnum.OPEN)
				.orElseThrow(() -> new EntityNotFoundException("client_card.not_found"));
		return mapper.toDto(entity);
	}

}
