package br.com.chadschoperia.domain.entities.historics;

import br.com.chadschoperia.domain.enums.HistoricProductActionEnum;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class HisoricBaseStock {
	@Column(name = "action", nullable = false)
	@Enumerated(EnumType.STRING)
	private HistoricProductActionEnum action;

	@Column(name = "description")
	private String description;

	@Column(name = "stock")
	private Double stock;

	@Column(name = "total_stock", nullable = false)
	private Double totalStock;

	@Column(name = "date_time", nullable = false)
	private LocalDateTime dateTime;

	public HisoricBaseStock(HistoricProductActionEnum action, String description, Double stock, Double totalStock) {
		this.action = action;
		this.description = description;
		this.stock = stock;
		this.totalStock = totalStock;
		this.dateTime = LocalDateTime.now();
	}
}
