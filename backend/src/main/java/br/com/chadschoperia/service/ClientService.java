package br.com.chadschoperia.service;

import br.com.chadschoperia.exceptions.EntityAlreadyExistsResource;
import br.com.chadschoperia.exceptions.EntityNotFoundException;
import br.com.chadschoperia.repository.ClientRepository;
import br.com.chadschoperia.service.dto.ClientDto;
import br.com.chadschoperia.service.dto.ViewClientDto;
import br.com.chadschoperia.service.dto.filters.ViewClientFilterDto;
import br.com.chadschoperia.service.mapper.ClientMapper;
import br.com.chadschoperia.service.mapper.ViewClientMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientService {

	private final ClientRepository clientRepository;

	private final ClientMapper clientMapper;

	private final ViewClientMapper viewClientMapper;

	public List<ViewClientDto> findAll() {
		return viewClientMapper.toDto(clientRepository.findAll());
	}

	public List<ViewClientDto> findAll(ViewClientFilterDto filter) {
		return clientRepository.listDtos(filter);
	}

	public ClientDto findById(Long idClient) {
		return clientMapper.toDto(clientRepository.findById(idClient)
				.orElseThrow(() -> new EntityNotFoundException("client.not_found")));
	}

	private void existsById(Long idClient) {
		if (!clientRepository.existsById(idClient)) {
			throw new EntityNotFoundException("client.not_found");
		}
	}

	private void existsByCpf(String cpf) {
		if (clientRepository.existsByCpf(cpf)) {
			throw new EntityAlreadyExistsResource("user.cpf.unique");
		}
	}

	public ClientDto create(ClientDto clientDto) {
		existsByCpf(clientDto.getCpf());
		return clientMapper.toDto(clientRepository.save(clientMapper.toEntity(clientDto)));
	}

	public ClientDto update(ClientDto clientDto) {
		existsById(clientDto.getId());
		if (!StringUtils.equals(clientDto.getCpf(), clientRepository.findCpfById(clientDto.getId()))) {
			existsByCpf(clientDto.getCpf());
		}
		return clientMapper.toDto(clientRepository.save(clientMapper.toEntity(clientDto)));
	}

	public void deleteById(Long idClient) {
		existsById(idClient);
		clientRepository.deleteById(idClient);
	}

}
