import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../../../services/utils.service';
import { Beer } from '../../../../../beer/models/beer.model';
import { BeerService } from '../../../../../beer/services/beer.service';
import { BaseReport } from '../../../../models/base.report';
import { REPORT_BEER_STOCK_VIEW_MODE_SELECT, ReportBeerStockViewMode } from '../../interfaces/report-beer-stock-view.mode';
import { BeerStockReportFilter } from '../../models/beer-stock-report.filter';
import { BeerStockReport, BeerStockReportGroup } from '../../models/beer-stock.report';
import { BeerReportService } from '../../services/beer-report.service';

@Component({
	selector: 'app-report-beer-stock',
	templateUrl: './report-beer-stock.component.html',
	styleUrls: ['./report-beer-stock.component.scss']
})
export class ReportBeerStockComponent implements OnInit {
	filter: BeerStockReportFilter = new BeerStockReportFilter();
	allBeers: Beer[] = [];
	viewMode: ReportBeerStockViewMode = 'all';
	viewModeOptions: SelectItem<ReportBeerStockViewMode>[] = REPORT_BEER_STOCK_VIEW_MODE_SELECT;

	isLoadingSearch: boolean = false;
	isLoadingBeers: boolean = false;

	allReports: BeerStockReport[] = [];
	reportsPerBeerViewAll: BeerStockReportGroup[] = [];
	reportsPerBeerViewDay: BeerStockReportGroup[] = [];
	reportsPerBeerViewWeek: BeerStockReportGroup[] = [];
	reportsPerBeerViewMonth: BeerStockReportGroup[] = [];
	reportsPerBeerViewYear: BeerStockReportGroup[] = [];

	hasLoadedViewDay: boolean = false;
	hasLoadedViewWeek: boolean = false;
	hasLoadedViewMonth: boolean = false;
	hasLoadedViewYear: boolean = false;

	constructor(
		private beerService: BeerService,
		private beerReportService: BeerReportService,
		private utilsService: UtilsService
	) {
	}

	ngOnInit() {
		this.fetchBeers();
	}

	fetchBeers(): void {
		this.isLoadingBeers = true;
		this.beerService.getAllComplete()
			.pipe(finalize(() => this.isLoadingBeers = false))
			.subscribe({
				next: (res) => this.updateBeers(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	search() {
		this.viewMode = 'all';
		this.hasLoadedViewDay = false;
		this.hasLoadedViewWeek = false;
		this.hasLoadedViewMonth = false;
		this.hasLoadedViewYear = false;

		this.isLoadingSearch = true;
		this.beerReportService.reportBeerStockOverTime(this.filter)
			.pipe(finalize(() => this.isLoadingSearch = false))
			.subscribe({
				next: (res) => this.updateReport(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private updateBeers(beers: Beer[]): void {
		this.filter.beers = beers.map(value => value.id!);
		this.allBeers = beers;
	}

	private updateReport(res: BeerStockReport[]): void {
		this.allReports = res;
		this.allReports.forEach(value => value.dateTime = new Date(value.dateTime));
		this.updateReportViewAll();
	}

	private updateReportViewAll(): void {
		this.reportsPerBeerViewAll = [];
		this.filter.beers.forEach(beerId => {
			const reports = this.allReports.filter(value => value.beerId === beerId);

			if (reports.length > 0) {
				this.reportsPerBeerViewAll.push(new BeerStockReportGroup(reports));
			}
		});
	}

	private updateReportViewDay(): void {
		if (this.hasLoadedViewDay) {
			return;
		}

		this.reportsPerBeerViewDay = [];
		this.reportsPerBeerViewDay = this.groupReportsPerBeer((reportGroup) => BaseReport.splitPerDay(reportGroup.reports));
		this.hasLoadedViewDay = true;
	}

	private updateReportViewWeek(): void {
		if (this.hasLoadedViewWeek) {
			return;
		}

		this.reportsPerBeerViewWeek = [];
		this.reportsPerBeerViewWeek = this.groupReportsPerBeer((reportGroup) => BaseReport.splitPerWeek(reportGroup.reports));
		this.hasLoadedViewWeek = true;
	}

	private updateReportViewMonth(): void {
		if (this.hasLoadedViewMonth) {
			return;
		}

		this.reportsPerBeerViewMonth = [];
		this.reportsPerBeerViewMonth = this.groupReportsPerBeer((reportGroup) => BaseReport.splitPerMonth(reportGroup.reports));
		this.hasLoadedViewMonth = true;
	}

	private updateReportViewYear(): void {
		if (this.hasLoadedViewYear) {
			return;
		}

		this.reportsPerBeerViewYear = [];
		this.reportsPerBeerViewYear = this.groupReportsPerBeer((reportGroup) => BaseReport.splitPerYear(reportGroup.reports));
		this.hasLoadedViewYear = true;
	}

	private groupReportsPerBeer(splitFn: (reportGroup: BeerStockReportGroup) => BeerStockReport[][]): BeerStockReportGroup[] {
		const reportGroups: BeerStockReportGroup[] = [];
		this.reportsPerBeerViewAll.forEach(reportGroup => {
			const allReportsPerDay: BeerStockReport[][] = splitFn(reportGroup);
			const reports: BeerStockReport[] = [];

			allReportsPerDay.forEach(day => {
				const report = day[0];
				report.value = day.map(value => value.value).reduce((accumulator, current) => accumulator + current);
				reports.push(report);
			});

			reportGroups.push(new BeerStockReportGroup(reports));
		});

		return reportGroups;
	}
}
