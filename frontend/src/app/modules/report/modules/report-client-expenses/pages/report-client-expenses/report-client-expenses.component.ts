import { Component } from '@angular/core';
import { finalize } from 'rxjs';
import { BaseClientReportFilter } from 'src/app/modules/report/models/base-client-report.filter';
import { ClientExpensesReport } from 'src/app/modules/report/models/client-expenses.report';
import { UtilsService } from 'src/app/services/utils.service';
import { ClientExpensesReportService } from '../../services/client-expenses-report.service';

@Component({
	selector: 'app-report-client-expenses',
	templateUrl: './report-client-expenses.component.html',
	styleUrls: ['./report-client-expenses.component.scss']
})
export class ReportClientExpensesComponent {
	isLoadingSearch: boolean = false;
	allReports: ClientExpensesReport[] = [];
	filter = new BaseClientReportFilter();

	constructor(
		private clientExpensesReportService: ClientExpensesReportService,
		private utilsService: UtilsService
	) {
	}

	search(): void {
		this.isLoadingSearch = true;
		this.clientExpensesReportService.reportClientExpenseOverTime(this.filter)
			.pipe(finalize(() => this.isLoadingSearch = false))
			.subscribe({
				next: (res) => this.updateReport(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private updateReport(res: ClientExpensesReport[]): void {
		this.allReports = res;
		this.allReports.forEach(value => value.dateTime = new Date(value.dateTime));
	}
}

