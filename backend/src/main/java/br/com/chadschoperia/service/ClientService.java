package br.com.chadschoperia.service;

import br.com.chadschoperia.repository.ClientRepository;
import br.com.chadschoperia.service.dto.ClientDto;
import br.com.chadschoperia.service.dto.ViewClientDto;
import br.com.chadschoperia.service.exception.BusinessException;
import br.com.chadschoperia.service.exception.EntityNotFoundException;
import br.com.chadschoperia.service.mapper.ClientMapper;
import br.com.chadschoperia.service.mapper.ViewClientMapper;
import br.com.chadschoperia.util.MessageUtil;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {

	private final ClientRepository clientRepository;

	private final ClientMapper clientMapper;

	private final ViewClientMapper viewClientMapper;

	public List<ViewClientDto> findAll() {
		return viewClientMapper.toDto(clientRepository.findAll());
	}

	public ClientDto findById(Long idClient) {
		return clientMapper.toDto(clientRepository.findById(idClient)
				.orElseThrow(() -> new EntityNotFoundException(MessageUtil.CLIENT_NOT_FOUND)));
	}

	private void existsById(Long idClient) {
		if (!clientRepository.existsById(idClient)) {
			throw new EntityNotFoundException(MessageUtil.CLIENT_NOT_FOUND);
		}
	}

	private void existsByCpf(String cpf) {
		if (clientRepository.existsByCpf(cpf)) {
			throw new BusinessException(MessageUtil.BUSINESS_EXCEPTION_CPF_ALREADY_REGISTERED);
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
