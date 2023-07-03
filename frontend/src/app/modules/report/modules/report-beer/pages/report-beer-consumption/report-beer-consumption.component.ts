import { Component } from "@angular/core";
import { finalize } from "rxjs";
import { UtilsService } from "src/app/services/utils.service";
import { ReportStockComponentUtils } from "../../../../utils/report-stock-component.utils";
import { BeerConsumptionFilter } from "../../models/beer-consumption-filter.model";
import { BeerConsumptionReport } from "../../models/beer-consumption.report";
import { BeerReportService } from "../../services/beer-report.service";
import { HeaderItem } from "src/app/models/report.model";
import { ReportService } from "src/app/services/report.service";
import * as moment from "moment";

const _ = require("lodash");

@Component({
	selector: "app-report-beer-consumption",
	templateUrl: "./report-beer-consumption.component.html",
	styleUrls: ["./report-beer-consumption.component.scss"],
})
export class ReportBeerConsumptionComponent {
	reportData: BeerConsumptionReport[] = [];

	filter: BeerConsumptionFilter = new BeerConsumptionFilter();

	isLoadingSearch: boolean = false;

	cols = [
		{ dataKey: "beerName", title: "Nome" },
		{ dataKey: "soldAmount", title: "Quantidade Vendida" },
	];

	constructor(private utilsService: UtilsService, private beerReportService: BeerReportService, private reportService: ReportService) {}

	search(): void {
		this.isLoadingSearch = true;
		this.beerReportService
			.getConsumptionReportOverTime(this.filter)
			.pipe(finalize(() => (this.isLoadingSearch = false)))
			.subscribe({
				next: (data) => (this.reportData = data),
				error: (error) => this.utilsService.showErrorMessage(error.error.detail),
			});
	}

	public exportPdf() {
		const headers: HeaderItem[] = [
			{ title: "Nome", style: { width: 85 } },
			{ title: "Quantidade Vendida", style: { width: 85 } },
		];

		const items = this.reportData.map((report) => [report.beerName, `${report.soldAmount}L\n`]);

		const minDateDisplayText = moment(this.filter.minDate).format("DD/MM/YYYY");
		const maxDateDisplayText = moment(this.filter.maxDate).format("DD/MM/YYYY");

		this.reportService.generateReport(
			`Relatório Consumo de Chope entre ${minDateDisplayText} e ${maxDateDisplayText}`,
			"relatorio-consumo-chope",
			headers,
			items
		);
	}
}
