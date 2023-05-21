import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs';
import { ClientExpensesReport } from 'src/app/modules/report/modules/report-client-expenses/models/client-expenses.report';
import { ClientReportFilter } from 'src/app/modules/report/modules/report-client-expenses/models/client-report.filter';
import { UtilsService } from 'src/app/services/utils.service';
import { SELLING_POINT_FORMAT, SELLING_POINT_SELECT, SellingPointEnum } from '../../../../../../enums/selling-point.enum';
import { FormatUtils } from '../../../../../../utils/format.utils';
import { CLIENT_EXPESES_REPORT_ORDER_SELECT, ClientExpesesReportOrderEnum } from '../../models/client-expeses-report-order.enum';
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

	formatTelephone(telephone: string): string {
		return FormatUtils.formatTelephone(telephone);
	}

	formatSellingPoint(sellingPoint: SellingPointEnum): string {
		return SELLING_POINT_FORMAT.get(sellingPoint)!;
	}

	private updateReport(res: ClientExpensesReport[]): void {
		this.allReports = res;
		this.allReports.forEach(value => value.dateTime = new Date(value.dateTime));
	}
}

