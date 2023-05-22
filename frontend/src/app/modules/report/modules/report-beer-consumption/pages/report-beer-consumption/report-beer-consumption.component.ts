import { finalize } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { BeerConsumptionFilter } from '../../models/beer-consumption-filter.model';
import { BeerConsumptionReport } from './../../models/beer-consumption.report';
import { Component } from '@angular/core';
import { BeerReportService } from '../../../report-beer/services/beer-report.service';

@Component({
  selector: 'app-report-beer-consumption',
  templateUrl: './report-beer-consumption.component.html',
  styleUrls: ['./report-beer-consumption.component.scss']
})
export class ReportBeerConsumptionComponent {

	reportData: BeerConsumptionReport[] = [];

	filter: BeerConsumptionFilter = new BeerConsumptionFilter();

	isLoadingSearch: boolean = false;

	constructor(private utilsService: UtilsService,
				private beerReportService: BeerReportService) {}

	search(): void {
		this.isLoadingSearch = true;
		this.beerReportService.getConsumptionReportOverTime(this.filter)
			.pipe(finalize(() => this.isLoadingSearch = false))
			.subscribe({
				next: (data) => this.reportData = data,
				error: (error) => this.utilsService.showErrorMessage(error.error.detail)
			});
	}

}
