package br.com.chadschoperia.service;

import br.com.chadschoperia.domain.entities.Client;
import br.com.chadschoperia.exceptions.EntityAlreadyExistsException;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.ClientRepository;
import br.com.chadschoperia.service.dto.ClientDto;
import br.com.chadschoperia.service.dto.ViewClientDto;
import br.com.chadschoperia.service.dto.filters.ViewClientFilterDto;
import br.com.chadschoperia.service.mapper.ClientMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientService {

	private final ClientRepository clientRepository;

	private final ClientMapper clientMapper;

	public List<ViewClientDto> findAllView(ViewClientFilterDto filter) {
		return clientRepository.findAllView(filter);
	}

	public ClientDto findDtoById(Long idClient) {
		return clientRepository.findDtoById(idClient)
				.orElseThrow(() -> new EntityNotFoundException("client.not_found"));
	}

	public Client findEntityById(Long idClient) {
		return clientRepository.findByIdAndDeletedIsFalse(idClient)
				.orElseThrow(() -> new EntityNotFoundException("client.not_found"));
	}

	public ClientDto create(ClientDto clientDto) {
		clientDto.setId(null);
		return saveDto(clientDto);
	}

	public ClientDto update(ClientDto clientDto) {
		findDtoById(clientDto.getId());
		return saveDto(clientDto);
	}

	public void deleteById(Long idClient) {
		Client entity = findEntityById(idClient);
		entity.setDeleted(Boolean.TRUE);
		saveEntity(entity);
	}

	private ClientDto saveDto(ClientDto dto) {
		return clientMapper.toDto(saveEntity(clientMapper.toEntity(dto)));
	}

	private Client saveEntity(Client entity) {
		if (clientRepository.existsDuplicateCpf(entity.getCpf(), entity.getId())) {
			throw new EntityAlreadyExistsException("user.cpf.unique");
		}

		return clientRepository.save(entity);
	}
}
