package br.com.chadschoperia.domain.entities;

import br.com.chadschoperia.domain.enums.RevenueExpenseTypeEnum;
import br.com.chadschoperia.domain.enums.SellingPointEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "revenue_expense")
@Getter
@Setter
@NoArgsConstructor
public class RevenueExpense implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequence_revenue_expense")
	@SequenceGenerator(name = "sequence_revenue_expense", sequenceName = "sequence_revenue_expense", allocationSize = 1)
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "type", nullable = false)
	@Enumerated(EnumType.STRING)
	private RevenueExpenseTypeEnum type;

	@Column(name = "description", nullable = false)
	private String description;

	@Column(name = "date_time", nullable = false)
	private LocalDateTime dateTime;

	@Column(name = "value", nullable = false)
	private Double value;

	@Column(name = "selling_point", nullable = false)
	@Enumerated(EnumType.STRING)
	private SellingPointEnum sellingPoint;

	public RevenueExpense(String description, Double value, SellingPointEnum sellingPoint) {
		this.type = value >= 0 ? RevenueExpenseTypeEnum.REVENUE : RevenueExpenseTypeEnum.EXPENSE;
		this.description = description;
		this.value = value;
		this.sellingPoint = sellingPoint;
		this.dateTime = LocalDateTime.now();
	}

	public RevenueExpense(String description, Double value, SellingPointEnum sellingPoint, LocalDateTime dateTime) {
		this.type = value >= 0 ? RevenueExpenseTypeEnum.REVENUE : RevenueExpenseTypeEnum.EXPENSE;
		this.description = description;
		this.value = value;
		this.sellingPoint = sellingPoint;
		this.dateTime = dateTime;
	}
}
