package br.com.chadschoperia.service.reports.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BeerConsumptionReportDto implements Serializable {

	private String beerName;

	private Double soldAmount;

}
