import { Component, OnInit } from "@angular/core";
import * as jspdf from "jspdf";
import autoTable from "jspdf-autotable";
import * as moment from "moment";
import { SelectItem } from "primeng/api";
import { finalize } from "rxjs/operators";
import { UtilsService } from "../../../../../../services/utils.service";
import { Beer } from "../../../../../beer/models/beer.model";
import { BeerService } from "../../../../../beer/services/beer.service";
import { REPORT_STOCK_VIEW_MODE_SELECT, ReportStockViewMode } from "../../../../interfaces/report-stock-view.mode";
import { ReportStockComponentUtils } from "../../../../utils/report-stock-component.utils";
import { BeerStockReport, BeerStockReportGroup } from "../../models/beer-stock.report";
import { BeerReportService } from "../../services/beer-report.service";
import { ReportService } from "src/app/services/report.service";
import { HeaderItem } from "src/app/models/report.model";
const _ = require("lodash");
import { CurrencyPipe } from "@angular/common";

@Component({
	selector: "app-report-beer-stock",
	templateUrl: "./report-beer-stock.component.html",
	styleUrls: ["./report-beer-stock.component.scss"],
	providers: [CurrencyPipe],
})
export class ReportBeerStockComponent extends ReportStockComponentUtils<BeerStockReport, BeerStockReportGroup> implements OnInit {
	allBeers: Beer[] = [];
	viewMode: ReportStockViewMode = "all";
	viewModeOptions: SelectItem<ReportStockViewMode>[] = REPORT_STOCK_VIEW_MODE_SELECT;

	isLoadingSearch: boolean = false;
	isLoadingBeers: boolean = false;
	cols = [
		{ dataKey: "description", title: "Descrição" },
		{ dataKey: "value", title: "Valor" },
		{ dataKey: "totalStock", title: "Estoque" },
		{ dataKey: "dateTime", title: "Data & Hora" },
	];

	constructor(
		private beerService: BeerService,
		private beerReportService: BeerReportService,
		private utilsService: UtilsService,
		private reportService: ReportService,
		private currencyPipe: CurrencyPipe
	) {
		super();
	}

	get reportsDisplay(): BeerStockReportGroup[] {
		return this.reportsGroups.get(this.viewMode)!.groups;
	}

	get reportsDisplayLoaded(): boolean {
		return this.reportsGroups.get(this.viewMode)!.loaded;
	}

	ngOnInit(): void {
		this.fetchBeers();
	}

	fetchBeers(): void {
		this.isLoadingBeers = true;
		this.beerService
			.getAllComplete()
			.pipe(finalize(() => (this.isLoadingBeers = false)))
			.subscribe({
				next: (res) => this.updateBeers(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail),
			});
	}

	loadReportGroups() {
		this.reportsFnGroups.get(this.viewMode)!.update();
	}

	search(): void {
		this.viewMode = "all";
		this.reportsGroups.forEach((control) => (control.loaded = false));

		this.isLoadingSearch = true;
		this.beerReportService
			.reportBeerStockOverTime(this.filter)
			.pipe(finalize(() => (this.isLoadingSearch = false)))
			.subscribe({
				next: (res) => this.updateReport(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail),
			});
	}

	private updateBeers(beers: Beer[]): void {
		this.filter.targets = beers.map((value) => value.id!);
		this.allBeers = beers;
	}

	private updateReport(res: BeerStockReport[]): void {
		this.allReports = res;
		this.allReports.forEach((value) => (value.dateTime = new Date(value.dateTime)));
		this.updateReportViewAll();
	}

	public getUnitSufix(): string {
		return " L";
	}

	protected newStockReportGroup(reports: BeerStockReport[]): BeerStockReportGroup {
		return new BeerStockReportGroup(reports);
	}

	public exportPdf() {
		const headers: HeaderItem[] = [
			{ title: "Descrição", style: { width: 110 } },
			{ title: "Valor", style: { width: 20 } },
			{ title: "Estoque", style: { width: 20 } },
			{ title: "Data & Hora", style: { width: 20 } },
		];

		this.reportsDisplay.forEach((reportDisplay) => {
			const items = reportDisplay.reports.map((beerReport) => [
				beerReport.description + "\n",
				this.currencyPipe.transform(beerReport.value, "BRL"),
				`${beerReport.totalStock}L`,
				moment(beerReport.dateTime).format("DD/MM/YYYY hh:MM:SS"),
			]);
			this.reportService.generateReport(
				`Relatório Estoque ${reportDisplay.productName}`,
				`relatorio-${String(reportDisplay.productName).toLowerCase().replace(/ /g, "-")}`,
				headers,
				items
			);
		});
	}
}
