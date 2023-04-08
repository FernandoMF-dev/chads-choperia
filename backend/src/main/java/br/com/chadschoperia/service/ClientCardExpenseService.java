package br.com.chadschoperia.service;

import br.com.chadschoperia.repository.ClientCardExpenseRepository;
import br.com.chadschoperia.service.mapper.ClientCardExpenseMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientCardExpenseService {

	private final ClientCardExpenseRepository repository;
	private final ClientCardExpenseMapper mapper;

}
