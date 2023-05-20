import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { BaseRevenueExpenseReportFilter } from 'src/app/modules/report/models/base-revenue-expense-report.filter';
import { RevenueExpenseReport } from 'src/app/modules/report/modules/report-revenue/models/revenue-expense.report';
import { UtilsService } from 'src/app/services/utils.service';
import { RevenueExpenseReportService } from '../../services/revenue-report.service';

export type RevenueExpenseType = 'REVENUE' | 'EXPENSE' | null;

export const REVENUE_EXPENSE_TYPE_OPTIONS: SelectItem<RevenueExpenseType>[] = [
	{ label: 'Ambas Movimentações', value: null },
	{ label: 'Receitas', value: 'REVENUE' },
	{ label: 'Despesas', value: 'EXPENSE' }
];

@Component({
	selector: 'app-report-revenue',
	templateUrl: './report-revenue.component.html',
	styleUrls: ['./report-revenue.component.scss']
})
export class ReportRevenueComponent {
	isLoadingSearch: boolean = false;
	allReports: RevenueExpenseReport[] = [];
	filter = new BaseRevenueExpenseReportFilter();
	viewModeOptions: SelectItem<RevenueExpenseType>[] = REVENUE_EXPENSE_TYPE_OPTIONS;

	totalRevenue?: number;

	constructor(
		private revenueExpenseReportService: RevenueExpenseReportService,
		private utilsService: UtilsService
	) {
	}

	search(): void {
		this.isLoadingSearch = true;
		this.revenueExpenseReportService.reportRevenueExpenseOverTime(this.filter)
			.pipe(finalize(() => this.isLoadingSearch = false))
			.subscribe({
				next: (res) => this.updateReport(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private updateReport(res: RevenueExpenseReport[]): void {
		this.allReports = res;
		this.totalRevenue = 0;

		this.allReports.forEach(report => {
			report.dateTime = new Date(report.dateTime);
			this.totalRevenue! += report.value;
		});
	}

	getTypeDisplayName(revenueExpenseReport: RevenueExpenseReport): string {
		return revenueExpenseReport.type === 'REVENUE' ? 'Receita' : 'Despesa';
	}
}
