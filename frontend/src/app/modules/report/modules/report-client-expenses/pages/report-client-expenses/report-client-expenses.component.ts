import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs';
import {
	ClientExpensesReport,
	ClientExpensesReportGroup
} from 'src/app/modules/report/modules/report-client-expenses/models/client-expenses.report';
import { ClientReportFilter } from 'src/app/modules/report/modules/report-client-expenses/models/client-report.filter';
import { UtilsService } from 'src/app/services/utils.service';
import { SELLING_POINT_FORMAT, SELLING_POINT_SELECT, SellingPointEnum } from '../../../../../../enums/selling-point.enum';
import { CLIENT_EXPENSES_REPORT_GROUP_SELECT, ClientExpensesReportGroupEnum } from '../../enums/client-expenses-report-group.enum';
import { CLIENT_EXPESES_REPORT_ORDER_SELECT, ClientExpensesReportOrderEnum } from '../../enums/client-expenses-report-order.enum';
import { ClientExpensesReportService } from '../../services/client-expenses-report.service';

@Component({
	selector: 'app-report-client-expenses',
	templateUrl: './report-client-expenses.component.html',
	styleUrls: ['./report-client-expenses.component.scss']
})
export class ReportClientExpensesComponent {
	isLoadingSearch: boolean = false;
	allReports: ClientExpensesReport[] = [];
	filter: ClientReportFilter = new ClientReportFilter();
	sellingPointOptions: SelectItem<SellingPointEnum>[] = SELLING_POINT_SELECT;
	orderOptions: SelectItem<ClientExpensesReportOrderEnum>[] = CLIENT_EXPESES_REPORT_ORDER_SELECT;
	groupOptions: SelectItem<ClientExpensesReportGroupEnum>[] = CLIENT_EXPENSES_REPORT_GROUP_SELECT;

	totalExpenses?: number;
	private reportGroups: Map<ClientExpensesReportGroupEnum, ReportGroupControl>;
	private backupFilter: ClientReportFilter = Object.assign({}, this.filter);

	constructor(
		private clientExpensesReportService: ClientExpensesReportService,
		private utilsService: UtilsService
	) {
		this.reportGroups = new Map<ClientExpensesReportGroupEnum, ReportGroupControl>([
			[ClientExpensesReportGroupEnum.CLIENT, {
				groups: [],
				loaded: false,
				formatKey: (report) => `${ report.clientId } - ${ report.clientName }`,
				formatGroup: (group, first) => {
					group.name = first.clientName;
					group.telephone = first.clientTelephone;
					group.email = first.clientEmail;
				},
				compareGroup: (a, b) => this.compareGroupViewClient(a, b)
			}],
			[ClientExpensesReportGroupEnum.SELLING_POINT, {
				groups: [],
				loaded: false,
				formatKey: (report) => `${ report.sellingPoint }`,
				formatGroup: (group, first) => {
					group.name = SELLING_POINT_FORMAT.get(first.sellingPoint)!;
				},
				compareGroup: (a, b) => this.compareGroupViewSellingPoint(a, b)
			}]
		]);
	}

	get selectedGroupView(): ReportGroupControl | undefined {
		return this.reportGroups.get(this.filter.group);
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

	loadGroupedReports() {
		const control: ReportGroupControl | undefined = this.selectedGroupView;

		if (control == null || control.loaded) {
			return;
		}
		this.loadGroupedView();
	}

	private updateReport(res: ClientExpensesReport[]): void {
		this.backupFilter = Object.assign({}, this.filter);
		this.allReports = res;
		this.totalExpenses = 0;

		this.reportGroups.forEach(control => {
			control.groups = [];
			control.loaded = false;
		});

		this.allReports.forEach(report => {
			this.totalExpenses! += report.value;
			return report.dateTime = new Date(report.dateTime);
		});
	}

	private loadGroupedView(): void {
		const control: ReportGroupControl = this.selectedGroupView!;
		const formatKey = control.formatKey;
		const formatGroup = control.formatGroup;
		const aux: { [key: string]: ClientExpensesReport[] } = {};

		this.allReports.forEach(report => {
			const key = formatKey(report);
			if (aux[key] == null) {
				aux[key] = [];
			}
			aux[key].push(report);
		});

		for (const key in aux) {
			const group = new ClientExpensesReportGroup(aux[key]);
			formatGroup(group, aux[key][0], aux[key]);
			group.value = aux[key].map(report => report.value).reduce((previous, current) => previous + current);
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
}

interface ReportGroupControl {
	groups: ClientExpensesReportGroup[];
	loaded: boolean;
	formatKey: (report: ClientExpensesReport) => string;
	formatGroup: (group: ClientExpensesReportGroup, first: ClientExpensesReport, reports: ClientExpensesReport[]) => void;
	compareGroup: (a: ClientExpensesReportGroup, b: ClientExpensesReportGroup) => number;
}
