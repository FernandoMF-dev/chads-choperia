package br.com.chadschoperia.domain.entities;

import br.com.chadschoperia.utils.FormatUtils;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Table(name = "client")
@Getter
@Setter
public class Client implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_client")
	@SequenceGenerator(name = "sequence_client", sequenceName = "sequence_client", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "telephone", nullable = false)
	private String telephone;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "cpf", nullable = false)
	private String cpf;

	public String getUniqueName() {
		return String.format("%s - %s", this.getName(), FormatUtils.formatTelephone(this.getTelephone()));
	}

}
