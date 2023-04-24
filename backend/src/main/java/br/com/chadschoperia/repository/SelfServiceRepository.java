package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.Beer;
import br.com.chadschoperia.domain.entities.SelfService;
import br.com.chadschoperia.service.dto.BeerDto;
import br.com.chadschoperia.service.dto.ViewBeerDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SelfServiceRepository extends JpaRepository<SelfService, Long> {

	@Query("select s from SelfService s order by s.dateTime desc")
	List<SelfService> getAllOrderByDateTime();

}
