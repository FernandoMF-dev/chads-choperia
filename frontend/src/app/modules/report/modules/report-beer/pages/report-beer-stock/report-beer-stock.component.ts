import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../../../services/utils.service';
import { Beer } from '../../../../../beer/models/beer.model';
import { BeerService } from '../../../../../beer/services/beer.service';
import { BeerStockReportFilter } from '../../models/beer-stock-report.filter';
import { BeerStockReport } from '../../models/beer-stock.report';
import { BeerReportService } from '../../services/beer-report.service';

@Component({
	selector: 'app-report-beer-stock',
	templateUrl: './report-beer-stock.component.html',
	styleUrls: ['./report-beer-stock.component.scss']
})
export class ReportBeerStockComponent implements OnInit {
	filter: BeerStockReportFilter = new BeerStockReportFilter();
	allReports: BeerStockReport[] = [];
	beers: Beer[] = [];

	isLoadingSearch: boolean = false;
	isLoadingBeers: boolean = false;

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
		this.isLoadingSearch = true;
		this.beerReportService.reportBeerStockOverTime(this.filter)
			.pipe(finalize(() => this.isLoadingSearch = false))
			.subscribe({
				next: (res) => this.updateReport(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private updateReport(res: BeerStockReport[]): void {
		this.allReports = res;
	}

	private updateBeers(beers: Beer[]): void {
		this.filter.beers = beers.map(value => value.id!);
		this.beers = beers;
	}
}
