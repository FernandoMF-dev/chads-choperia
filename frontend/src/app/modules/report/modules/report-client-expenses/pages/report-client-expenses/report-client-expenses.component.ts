import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs';
import { ClientExpensesReport } from 'src/app/modules/report/modules/report-client-expenses/models/client-expenses.report';
import { ClientReportFilter } from 'src/app/modules/report/modules/report-client-expenses/models/client-report.filter';
import { UtilsService } from 'src/app/services/utils.service';
import { SELLING_POINT_SELECT, SellingPointEnum } from '../../../../../../enums/selling-point.enum';
import { CLIENT_EXPENSES_REPORT_GROUP_SELECT, ClientExpesesReportGroupEnum } from '../../enums/client-expeses-report-group.enum';
import { CLIENT_EXPESES_REPORT_ORDER_SELECT, ClientExpesesReportOrderEnum } from '../../enums/client-expeses-report-order.enum';
import { ClientExpensesReportService } from '../../services/client-expenses-report.service';

@Component({
	selector: 'app-report-client-expenses',
	templateUrl: './report-client-expenses.component.html',
	styleUrls: ['./report-client-expenses.component.scss']
})
export class ReportClientExpensesComponent {
	isLoadingSearch: boolean = false;
	allReports: ClientExpensesReport[] = [];
	filter = new ClientReportFilter();
	sellingPointOptions: SelectItem<SellingPointEnum>[] = SELLING_POINT_SELECT;
	orderOptions: SelectItem<ClientExpesesReportOrderEnum>[] = CLIENT_EXPESES_REPORT_ORDER_SELECT;
	groupOptions: SelectItem<ClientExpesesReportGroupEnum>[] = CLIENT_EXPENSES_REPORT_GROUP_SELECT;

	totalExpenses?: number;

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
		this.totalExpenses = 0;
		this.allReports.forEach(report => {
			this.totalExpenses! += report.value;
			return report.dateTime = new Date(report.dateTime);
		});
	}
}

