import { Component } from "@angular/core";
import { SelectItem } from "primeng/api";
import { finalize } from "rxjs/operators";
import { RevenueExpenseReportFilter } from "src/app/modules/report/modules/report-revenue/models/revenue-expense-report.filter";
import { RevenueExpenseReport } from "src/app/modules/report/modules/report-revenue/models/revenue-expense.report";
import { UtilsService } from "src/app/services/utils.service";
import { SELLING_POINT_FORMAT, SELLING_POINT_SELECT, SellingPointEnum } from "../../../../../../enums/selling-point.enum";
import { ReportStockComponentUtils } from "../../../../utils/report-stock-component.utils";
import { REVENUE_EXPENSE_TYPE_OPTIONS, RevenueExpenseTypeEnum } from "../../enums/revenue-expense-type.enum";
import { RevenueExpenseReportService } from "../../services/revenue-report.service";
import { HeaderItem } from "src/app/models/report.model";
import { ReportService } from "src/app/services/report.service";
import { CurrencyPipe } from "@angular/common";
import * as moment from "moment";

const _ = require("lodash");

@Component({
	selector: "app-report-revenue",
	templateUrl: "./report-revenue.component.html",
	styleUrls: ["./report-revenue.component.scss"],
	providers: [CurrencyPipe],
})
export class ReportRevenueComponent {
	isLoadingSearch: boolean = false;
	allReports: RevenueExpenseReport[] = [];
	filter = new RevenueExpenseReportFilter();
	typeOptions: SelectItem<RevenueExpenseTypeEnum | null>[] = REVENUE_EXPENSE_TYPE_OPTIONS;
	sellingPointOptions: SelectItem<SellingPointEnum>[] = SELLING_POINT_SELECT;

	totalRevenue?: number;

	cols = [
		{ dataKey: "type", title: "Tipo" },
		{ dataKey: "description", title: "Descrição" },
		{ dataKey: "value", title: "Valor" },
		{ dataKey: "dateTime", title: "Data & Hora" },
	];

	constructor(
		private revenueExpenseReportService: RevenueExpenseReportService,
		private utilsService: UtilsService,
		private reportService: ReportService,
		private currencyPipe: CurrencyPipe
	) {}

	search(): void {
		this.isLoadingSearch = true;
		this.revenueExpenseReportService
			.reportRevenueExpenseOverTime(this.filter)
			.pipe(finalize(() => (this.isLoadingSearch = false)))
			.subscribe({
				next: (res) => this.updateReport(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail),
			});
	}

	formatSellingPoint(sellingPoint: SellingPointEnum): string {
		return SELLING_POINT_FORMAT.get(sellingPoint)!;
	}

	getTypeDisplayName(revenueExpenseReport: RevenueExpenseReport): string {
		return revenueExpenseReport.type === "REVENUE" ? "Receita" : "Despesa";
	}

	private updateReport(res: RevenueExpenseReport[]): void {
		this.allReports = res;
		this.totalRevenue = 0;

		this.allReports.forEach((report) => {
			report.dateTime = new Date(report.dateTime);
			this.totalRevenue! += report.value;
		});
	}

	public exportPdf() {
		const body: any[] = _.cloneDeep(this.allReports);
		body.forEach((elem) => {
			elem.type = this.getTypeDisplayName(elem);
			elem.sellingPoint = this.formatSellingPoint(elem.sellingPoint);
		});

		const headers: HeaderItem[] = [
			{ title: "Tipo", style: { width: 20 } },
			{ title: "Descrição", style: { width: 110 } },
			{ title: "Valor", style: { width: 20 } },
			{ title: "Data & Hora", style: { width: 20 } },
		];

		const items = body.map((revenueExpensesReport: any) => [
			revenueExpensesReport.type,
			revenueExpensesReport.description + "\n",
			this.currencyPipe.transform(revenueExpensesReport.value, "BRL"),
			moment(revenueExpensesReport.dateTime).format("DD/MM/YYYY hh:MM:SS"),
		]);
		this.reportService.generateReport(
			`Relatório Receita x Despesas / Saldo Final: ${this.currencyPipe.transform(this.totalRevenue, "BRL")}`,
			`relatorio-receitas-despesas`,
			headers,
			items
		);
	}
}
