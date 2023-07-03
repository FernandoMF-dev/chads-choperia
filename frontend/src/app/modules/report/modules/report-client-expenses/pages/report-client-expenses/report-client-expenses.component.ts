import { Component } from "@angular/core";
import { SelectItem } from "primeng/api";
import { finalize } from "rxjs";
import {
	ClientExpensesReport,
	ClientExpensesReportGroup,
} from "src/app/modules/report/modules/report-client-expenses/models/client-expenses.report";
import { ClientReportFilter } from "src/app/modules/report/modules/report-client-expenses/models/client-report.filter";
import { UtilsService } from "src/app/services/utils.service";
import { SELLING_POINT_FORMAT, SELLING_POINT_SELECT, SellingPointEnum } from "../../../../../../enums/selling-point.enum";
import { FormatUtils } from "../../../../../../utils/format.utils";
import { ReportStockComponentUtils } from "../../../../utils/report-stock-component.utils";
import { CLIENT_EXPENSES_REPORT_GROUP_SELECT, ClientExpensesReportGroupEnum } from "../../enums/client-expenses-report-group.enum";
import { CLIENT_EXPESES_REPORT_ORDER_SELECT, ClientExpensesReportOrderEnum } from "../../enums/client-expenses-report-order.enum";
import { ClientExpensesReportService } from "../../services/client-expenses-report.service";
import { HeaderItem } from "src/app/models/report.model";
import { CurrencyPipe } from "@angular/common";
import { ReportService } from "src/app/services/report.service";
import * as moment from "moment";
const _ = require("lodash");

@Component({
	selector: "app-report-client-expenses",
	templateUrl: "./report-client-expenses.component.html",
	styleUrls: ["./report-client-expenses.component.scss"],
	providers: [CurrencyPipe],
})
export class ReportClientExpensesComponent {
	isLoadingSearch: boolean = false;
	allReports: ClientExpensesReport[] = [];
	filter: ClientReportFilter = new ClientReportFilter();
	sellingPointOptions: SelectItem<SellingPointEnum>[] = SELLING_POINT_SELECT;
	orderOptions: SelectItem<ClientExpensesReportOrderEnum>[] = CLIENT_EXPESES_REPORT_ORDER_SELECT;
	groupOptions: SelectItem<ClientExpensesReportGroupEnum>[] = CLIENT_EXPENSES_REPORT_GROUP_SELECT;

	totalExpenses?: number;
	groupMode: ClientExpensesReportGroupEnum = ClientExpensesReportGroupEnum.ALL;
	private reportGroups: Map<ClientExpensesReportGroupEnum, ReportGroupControl>;
	private backupFilter: ClientReportFilter = Object.assign({}, this.filter);

	cols = [
		{ dataKey: "clientName", title: "Nome" },
		{ dataKey: "clientTelephone", title: "Telefone" },
		{ dataKey: "clientEmail", title: "Email" },
		{ dataKey: "description", title: "Descrição" },
		{ dataKey: "value", title: "Valor" },
		{ dataKey: "sellingPoint", title: "Ponto de Venda" },
		{ dataKey: "dateTime", title: "Data & Hora" },
	];

	constructor(
		private clientExpensesReportService: ClientExpensesReportService,
		private utilsService: UtilsService,
		private currencyPipe: CurrencyPipe,
		private reportService: ReportService
	) {
		this.reportGroups = new Map<ClientExpensesReportGroupEnum, ReportGroupControl>([
			[
				ClientExpensesReportGroupEnum.CLIENT,
				{
					groups: [],
					loaded: false,
					formatKey: (report) => `${report.clientId} - ${report.clientName}`,
					formatGroup: (group, first) => {
						group.name = first.clientName;
						group.telephone = first.clientTelephone;
						group.email = first.clientEmail;
					},
					compareGroup: (a, b) => this.compareGroupViewClient(a, b),
				},
			],
			[
				ClientExpensesReportGroupEnum.SELLING_POINT,
				{
					groups: [],
					loaded: false,
					formatKey: (report) => `${report.sellingPoint}`,
					formatGroup: (group, first) => {
						group.name = SELLING_POINT_FORMAT.get(first.sellingPoint)!;
					},
					compareGroup: (a, b) => this.compareGroupViewSellingPoint(a, b),
				},
			],
		]);
	}

	get selectedGroupView(): ReportGroupControl | undefined {
		return this.reportGroups.get(this.groupMode);
	}

	search(): void {
		this.isLoadingSearch = true;
		this.clientExpensesReportService
			.reportClientExpenseOverTime(this.filter)
			.pipe(finalize(() => (this.isLoadingSearch = false)))
			.subscribe({
				next: (res) => this.updateReport(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail),
			});
	}

	loadGroupedReports() {
		const control: ReportGroupControl | undefined = this.selectedGroupView;

		if (control == null || control.loaded) {
			return;
		}
		this.loadGroupedView();
	}

	private updateReport(res: ClientExpensesReport[]): void {
		this.groupMode = ClientExpensesReportGroupEnum.ALL;
		this.backupFilter = Object.assign({}, this.filter);
		this.allReports = res;
		this.totalExpenses = 0;

		this.reportGroups.forEach((control) => {
			control.groups = [];
			control.loaded = false;
		});

		this.allReports.forEach((report) => {
			this.totalExpenses! += report.value;
			return (report.dateTime = new Date(report.dateTime));
		});
	}

	private loadGroupedView(): void {
		const control: ReportGroupControl = this.selectedGroupView!;
		const formatKey = control.formatKey;
		const formatGroup = control.formatGroup;
		const aux: { [key: string]: ClientExpensesReport[] } = {};

		this.allReports.forEach((report) => {
			const key = formatKey(report);
			if (aux[key] == null) {
				aux[key] = [];
			}
			aux[key].push(report);
		});

		for (const key in aux) {
			const group = new ClientExpensesReportGroup(aux[key]);
			formatGroup(group, aux[key][0], aux[key]);
			group.value = aux[key].map((report) => report.value).reduce((previous, current) => previous + current);
			control.groups.push(group);
		}
		control.loaded = true;
	}

	private compareGroupViewClient(a: ClientExpensesReportGroup, b: ClientExpensesReportGroup): number {
		if (this.backupFilter.order === ClientExpensesReportOrderEnum.CLIENT) {
			return a.name.localeCompare(b.name);
		}
		if (this.backupFilter.order === ClientExpensesReportOrderEnum.VALUE) {
			return b.value - a.value;
		}
		return 0;
	}

	private compareGroupViewSellingPoint(a: ClientExpensesReportGroup, b: ClientExpensesReportGroup): number {
		if (this.backupFilter.order === ClientExpensesReportOrderEnum.SELLING_POINT) {
			return a.name.localeCompare(b.name);
		}
		if (this.backupFilter.order === ClientExpensesReportOrderEnum.VALUE) {
			return b.value - a.value;
		}
		return 0;
	}

	public exportPdf() {
		const fileName = "Gastos de Clientes";
		if (this.groupMode === "ALL") {
			const body: any[] = _.cloneDeep(this.allReports);
			body.forEach((elem) => {
				elem.clientTelephone = FormatUtils.formatTelephone(elem.clientTelephone);
				elem.sellingPoint = SELLING_POINT_FORMAT.get(elem.sellingPoint);
			});

			const headers: HeaderItem[] = [
				{ title: "Nome", style: { width: 20 } },
				{ title: "Telefone", style: { width: 30 } },
				{ title: "Email", style: { width: 30 } },
				{ title: "Descrição", style: { width: 30 } },
				{ title: "Valor", style: { width: 15 } },
				{ title: "Ponto de Venda", style: { width: 30 } },
				{ title: "Data & Hora", style: { width: 15 } },
			];

			const items = body.map((clientExpenseReport: ClientExpensesReport) => [
				clientExpenseReport.clientName,
				clientExpenseReport.clientTelephone,
				clientExpenseReport.clientEmail,
				clientExpenseReport.description + "\n",
				this.currencyPipe.transform(clientExpenseReport.value, "BRL"),
				clientExpenseReport.sellingPoint,
				moment(clientExpenseReport.dateTime).format("DD/MM/YYYY hh:MM:SS"),
			]);
			this.reportService.generateReport(
				`Relatório Gastos de Cliente / Total: ${this.currencyPipe.transform(this.totalExpenses, "BRL")}`,
				`relatorio-gastos-cliente`,
				headers,
				items
			);
		} else {
			if (this.selectedGroupView) {
				ReportStockComponentUtils.groupedExportPdfCostumer(
					this.selectedGroupView.groups,
					this.cols,
					fileName,
					this.groupMode === "SELLING_POINT"
				);
			}
		}
	}
}

interface ReportGroupControl {
	groups: ClientExpensesReportGroup[];
	loaded: boolean;
	formatKey: (report: ClientExpensesReport) => string;
	formatGroup: (group: ClientExpensesReportGroup, first: ClientExpensesReport, reports: ClientExpensesReport[]) => void;
	compareGroup: (a: ClientExpensesReportGroup, b: ClientExpensesReportGroup) => number;
}
