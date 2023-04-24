package br.com.chadschoperia.domain.entities;

import br.com.chadschoperia.domain.enums.ClientCardStatusEnum;
import br.com.chadschoperia.domain.enums.PaymentMethodEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "self_service")
@Getter
@Setter
public class SelfService {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_self_service")
	@SequenceGenerator(name = "sequence_self_service", sequenceName = "sequence_self_service", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;
	
	@Column(name = "price_per_kg", nullable = false)
	private Double pricePerKg = 0.0;

	@Column(name = "date_time")
	private LocalDateTime dateTime;


}
