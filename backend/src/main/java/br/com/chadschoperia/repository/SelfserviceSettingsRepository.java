package br.com.chadschoperia.repository;

import br.com.chadschoperia.domain.entities.SelfserviceSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SelfserviceSettingsRepository extends JpaRepository<SelfserviceSettings, Long> {

	SelfserviceSettings findFirstByOrderByIdDesc();

}
