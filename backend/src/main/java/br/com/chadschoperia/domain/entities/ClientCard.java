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
@Table(name = "client_card")
@Getter
@Setter
public class ClientCard {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_client_card")
	@SequenceGenerator(name = "sequence_client_card", sequenceName = "sequence_client_card", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_client", referencedColumnName = "id", nullable = false)
	private Client client;

	@Column(name = "rfid", nullable = false, length = 10)
	private String rfid;

	@Column(name = "payment", nullable = false)
	private Double payment = 0.0;

	@Column(name = "payment_method")
	@Enumerated(EnumType.STRING)
	private PaymentMethodEnum paymentMethod;

	@Column(name = "check_in")
	private LocalDateTime checkIn;

	@Column(name = "check_out")
	private LocalDateTime checkOut;

	@Column(name = "status", nullable = false)
	@Enumerated(EnumType.STRING)
	private ClientCardStatusEnum status = ClientCardStatusEnum.OPEN;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "card")
	private List<ClientCardExpense> expenses = new ArrayList<>();

	public Double getTotalExpenses() {
		return this.getExpenses().stream()
				.mapToDouble(ClientCardExpense::getValue)
				.sum();
	}

	public Double getChange() {
		return this.getPayment() - this.getTotalExpenses();
	}
}
