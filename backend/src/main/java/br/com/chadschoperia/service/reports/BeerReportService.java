package br.com.chadschoperia.service.reports;

import br.com.chadschoperia.repository.reports.BeerReportRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class BeerReportService {
	private final BeerReportRepository beerReportRepository;
}
