package br.com.chadschoperia.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "client_card")
@Getter
@Setter
public class ClientCardModel {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_client_card")
	@SequenceGenerator(name = "sequence_client_card", sequenceName = "sequence_client_card", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "id_client", referencedColumnName = "id")
	private ClientModel client;

	@Column(name = "rfid", nullable = false)
	private Long rfid;

	@Column(name = "payment", nullable = false)
	private Double payment = 0.0;

	@Column(name = "payment_method")
	private String paymentMethod;

	@Column(name = "check_in")
	private LocalDateTime checkIn;

	@Column(name = "check_out")
	private LocalDateTime checkOut;
}
