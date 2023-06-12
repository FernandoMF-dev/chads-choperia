package br.com.chadschoperia.domain.entities;

import br.com.chadschoperia.domain.enums.SellingPointEnum;
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
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "client_card_expense")
@Getter
@Setter
public class ClientCardExpense {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_client_card_expense")
	@SequenceGenerator(name = "sequence_client_card_expense", sequenceName = "sequence_client_card_expense", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_client_card", referencedColumnName = "id", nullable = false)
	private ClientCard card;

	@Column(name = "value", nullable = false)
	private Double value = 0.0;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "date_time", nullable = false)
	private LocalDateTime dateTime;

	@Column(name = "selling_point", nullable = false)
	@Enumerated(EnumType.STRING)
	private SellingPointEnum sellingPoint;
}
