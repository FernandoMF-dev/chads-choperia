import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { RevenueExpenseReportFilter } from 'src/app/modules/report/modules/report-revenue/models/revenue-expense-report.filter';
import { RevenueExpenseReport } from 'src/app/modules/report/modules/report-revenue/models/revenue-expense.report';
import { UtilsService } from 'src/app/services/utils.service';
import { SELLING_POINT_FORMAT, SELLING_POINT_SELECT, SellingPointEnum } from '../../../../../../enums/selling-point.enum';
import { ReportStockComponentUtils } from '../../../../utils/report-stock-component.utils';
import { REVENUE_EXPENSE_TYPE_OPTIONS, RevenueExpenseTypeEnum } from '../../enums/revenue-expense-type.enum';
import { RevenueExpenseReportService } from '../../services/revenue-report.service';
const _ = require('lodash');

@Component({
	selector: 'app-report-revenue',
	templateUrl: './report-revenue.component.html',
	styleUrls: ['./report-revenue.component.scss']
})
export class ReportRevenueComponent {
	isLoadingSearch: boolean = false;
	allReports: RevenueExpenseReport[] = [];
	filter = new RevenueExpenseReportFilter();
	typeOptions: SelectItem<RevenueExpenseTypeEnum | null>[] = REVENUE_EXPENSE_TYPE_OPTIONS;
	sellingPointOptions: SelectItem<SellingPointEnum>[] = SELLING_POINT_SELECT;

	totalRevenue?: number;

	cols = [
		{ dataKey: 'type', title: 'Tipo'},
		{ dataKey: 'description', title: 'Descrição'},
		{ dataKey: 'value', title: 'Valor' },
		{ dataKey: 'sellingPoint', title: 'Ponto de Venda' },
		{ dataKey: 'dateTime', title: 'Data & Hora' },
	];

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

	formatSellingPoint(sellingPoint: SellingPointEnum): string {
		return SELLING_POINT_FORMAT.get(sellingPoint)!;
	}

	getTypeDisplayName(revenueExpenseReport: RevenueExpenseReport): string {
		return revenueExpenseReport.type === 'REVENUE' ? 'Receita' : 'Despesa';
	}

	private updateReport(res: RevenueExpenseReport[]): void {
		this.allReports = res;
		this.totalRevenue = 0;

		this.allReports.forEach(report => {
			report.dateTime = new Date(report.dateTime);
			this.totalRevenue! += report.value;
		});
	}

	public exportPdf(){
		const body: any[] = _.cloneDeep(this.allReports);
		body.forEach(elem => {
			elem.type = this.getTypeDisplayName(elem);
			elem.sellingPoint = this.formatSellingPoint(elem.sellingPoint);
		})

		ReportStockComponentUtils.exportPdf(body, this.cols,'Receita x Despesas', this.totalRevenue )
	}
}
