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

	private reportsGroups: Map<ReportBeerStockViewMode, BeerStockReportGroupControl>;
	private reportsFnGroups: Map<ReportBeerStockViewMode, BeerStockReportFnGroupControl>;

	constructor(
		private beerService: BeerService,
		private beerReportService: BeerReportService,
		private utilsService: UtilsService
	) {
		this.reportsGroups = new Map([
			['all', { groups: [], loaded: false }],
			['day', { groups: [], loaded: false }],
			['week', { groups: [], loaded: false }],
			['month', { groups: [], loaded: false }],
			['year', { groups: [], loaded: false }]
		]);

		this.reportsFnGroups = new Map([
			['all', { update: () => this.updateReportViewAll() }],
			['day', { update: () => this.updateReportViewDay() }],
			['week', { update: () => this.updateReportViewWeek() }],
			['month', { update: () => this.updateReportViewMonth() }],
			['year', { update: () => this.updateReportViewYear() }]
		]);
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
		this.beerService.getAllComplete()
			.pipe(finalize(() => this.isLoadingBeers = false))
			.subscribe({
				next: (res) => this.updateBeers(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	loadReportGroups() {
		this.reportsFnGroups.get(this.viewMode)!.update();
	}

	search(): void {
		this.viewMode = 'all';
		this.reportsGroups.forEach(control => control.loaded = false);

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
		this.reportsGroups.set('all', { groups: [], loaded: false });

		const groups: BeerStockReportGroup[] = [];

		this.filter.beers.forEach(beerId => {
			const reports = this.allReports.filter(value => value.beerId === beerId);

			if (reports.length > 0) {
				groups.push(new BeerStockReportGroup(reports));
			}
		});

		this.reportsGroups.set('all', { groups: groups, loaded: true });
	}

	private updateReportViewDay(): void {
		if (this.reportsGroups.get('day')!.loaded) {
			return;
		}

		this.groupReportsPerBeer('day', (reportGroup) => BaseReport.splitPerDay(reportGroup.reports));
	}

	private updateReportViewWeek(): void {
		if (this.reportsGroups.get('week')!.loaded) {
			return;
		}

		this.groupReportsPerBeer('week', (reportGroup) => BaseReport.splitPerWeek(reportGroup.reports));
	}

	private updateReportViewMonth(): void {
		if (this.reportsGroups.get('month')!.loaded) {
			return;
		}

		this.groupReportsPerBeer('month', (reportGroup) => BaseReport.splitPerMonth(reportGroup.reports));
	}

	private updateReportViewYear(): void {
		if (this.reportsGroups.get('year')!.loaded) {
			return;
		}

		this.groupReportsPerBeer('year', (reportGroup) => BaseReport.splitPerYear(reportGroup.reports));
	}

	private groupReportsPerBeer(group: ReportBeerStockViewMode, splitFn: (reportGroup: BeerStockReportGroup) => BeerStockReport[][]): void {
		const reportGroups: BeerStockReportGroup[] = [];
		this.reportsGroups.get('all')!.groups.forEach(reportGroup => {
			const allReportsPerDay: BeerStockReport[][] = splitFn(reportGroup);
			const reports: BeerStockReport[] = [];

			allReportsPerDay.forEach(day => {
				const report = day[0];
				report.value = day.map(value => value.value).reduce((accumulator, current) => accumulator + current);
				reports.push(report);
			});

			reportGroups.push(new BeerStockReportGroup(reports));
		});

		this.reportsGroups.set(group, { groups: reportGroups, loaded: true });
	}
}

interface BeerStockReportGroupControl {
	groups: BeerStockReportGroup[];
	loaded: boolean;
}

interface BeerStockReportFnGroupControl {
	update: () => void;
}
