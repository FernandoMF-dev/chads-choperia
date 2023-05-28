import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { ReportStockComponentUtils } from '../../../../utils/report-stock-component.utils';
import { BeerReportService } from '../../../report-beer/services/beer-report.service';
import { BeerConsumptionFilter } from '../../models/beer-consumption-filter.model';
import { BeerConsumptionReport } from '../../models/beer-consumption.report';

const _ = require('lodash');

@Component({
	selector: 'app-report-beer-consumption',
	templateUrl: './report-beer-consumption.component.html',
	styleUrls: ['./report-beer-consumption.component.scss']
})
export class ReportBeerConsumptionComponent {

	reportData: BeerConsumptionReport[] = [];

	filter: BeerConsumptionFilter = new BeerConsumptionFilter();

	isLoadingSearch: boolean = false;

	cols = [
		{ dataKey: 'beerName', title: 'Nome' },
		{ dataKey: 'soldAmount', title: 'Quantidade Vendida' }
	];

	constructor(
		private utilsService: UtilsService,
		private beerReportService: BeerReportService
	) {
	}

	search(): void {
		this.isLoadingSearch = true;
		this.beerReportService.getConsumptionReportOverTime(this.filter)
			.pipe(finalize(() => this.isLoadingSearch = false))
			.subscribe({
				next: (data) => this.reportData = data,
				error: (error) => this.utilsService.showErrorMessage(error.error.detail)
			});
	}

	public exportPdf() {
		const body: any[] = _.cloneDeep(this.reportData);
		body.forEach(elem => {
			elem.soldAmount = (elem.soldAmount * -1) + ' L ';
		});
		ReportStockComponentUtils.exportPdf(body, this.cols, 'Consumo de Chopes');
	}

}
