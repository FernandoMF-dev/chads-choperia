import { ReportStockViewMode } from '../interfaces/report-stock-view.mode';
import { BaseStockReportFilter } from '../models/base-stock-report.filter';
import { BaseStockReport, BaseStockReportGroup } from '../models/base-stock.report';
import { BaseReport } from '../models/base.report';

export abstract class ReportStockComponentUtils<R extends BaseStockReport, G extends BaseStockReportGroup<R>, F extends BaseStockReportFilter = BaseStockReportFilter> {
	filter: BaseStockReportFilter = new BaseStockReportFilter();
	allReports: R[] = [];

	protected reportsGroups: Map<ReportStockViewMode, StockReportGroupControl<R, G>>;
	protected reportsFnGroups: Map<ReportStockViewMode, StockReportFnGroupControl>;

	protected constructor() {
		this.reportsGroups = new Map([
			['all', { groups: [], loaded: false }],
			['day', { groups: [], loaded: false }],
			['week', { groups: [], loaded: false }],
			['month', { groups: [], loaded: false }],
			['year', { groups: [], loaded: false }]
		]);

		this.reportsFnGroups = new Map([
			['all', { update: () => this.updateReportViewAll() }],
			['day', { update: () => this.updateReportViewDay() }],
			['week', { update: () => this.updateReportViewWeek() }],
			['month', { update: () => this.updateReportViewMonth() }],
			['year', { update: () => this.updateReportViewYear() }]
		]);
	}

	protected abstract newStockReportGroup(reports: R[]): G;

	protected abstract getUnitSufix(): string;

	protected updateReportViewAll(): void {
		this.reportsGroups.set('all', { groups: [], loaded: false });

		const groups: G[] = [];

		this.filter.targets.forEach(targetId => {
			const reports = this.allReports.filter(value => value.productId === targetId);

			if (reports.length > 0) {
				groups.push(this.newStockReportGroup(reports));
			}
		});

		this.reportsGroups.set('all', { groups: groups, loaded: true });
	}

	protected updateReportViewDay(): void {
		if (this.reportsGroups.get('day')!.loaded) {
			return;
		}

		this.groupReportsPerTarget('day', (reportGroup) => BaseReport.splitPerDay(reportGroup.reports));
	}

	protected updateReportViewWeek(): void {
		if (this.reportsGroups.get('week')!.loaded) {
			return;
		}

		this.groupReportsPerTarget('week', (reportGroup) => BaseReport.splitPerWeek(reportGroup.reports));
	}

	protected updateReportViewMonth(): void {
		if (this.reportsGroups.get('month')!.loaded) {
			return;
		}

		this.groupReportsPerTarget('month', (reportGroup) => BaseReport.splitPerMonth(reportGroup.reports));
	}

	protected updateReportViewYear(): void {
		if (this.reportsGroups.get('year')!.loaded) {
			return;
		}

		this.groupReportsPerTarget('year', (reportGroup) => BaseReport.splitPerYear(reportGroup.reports));
	}

	protected groupReportsPerTarget(group: ReportStockViewMode, splitFn: (reportGroup: G) => R[][]): void {
		const reportGroups: G[] = [];

		this.reportsGroups.get('all')!.groups.forEach(reportGroup => {
			const allReportsPerDay: R[][] = splitFn(reportGroup);
			const reports: R[] = [];

			allReportsPerDay.forEach(day => {
				const report: R = Object.assign({}, day[0]);
				let addStock: StockMovementControl = { total: 0, qntd: 0 };
				let minusStock: StockMovementControl = { total: 0, qntd: 0 };

				day.forEach(value => this.acumulateStockMovements(value.value < 0 ? minusStock : addStock, value));
				report.description = this.formatGroupedReportDescription(addStock, minusStock);
				report.value = addStock.total + minusStock.total;
				reports.push(report);
			});

			reportGroups.push(this.newStockReportGroup(reports));
		});

		this.reportsGroups.set(group, { groups: reportGroups, loaded: true });
	}

	protected acumulateStockMovements(control: StockMovementControl, value: R): void {
		control.total += value.value;
		control.qntd++;
	}

	protected formatGroupedReportDescription(addStock: StockMovementControl, minusStock: StockMovementControl): string {
		return `${ addStock.qntd + minusStock.qntd } movimentações no estoque.<br>`
			+ `${ addStock.qntd } adições ao estoque totalizando ${ addStock.total.toFixed(1) }${ this.getUnitSufix() }.<br>`
			+ `${ minusStock.qntd } remoções no estoque totalizando ${ minusStock.total.toFixed(1) }${ this.getUnitSufix() }.`;
	}
}


interface StockReportGroupControl<R extends BaseStockReport, G extends BaseStockReportGroup<R>> {
	groups: G[];
	loaded: boolean;
}

interface StockReportFnGroupControl {
	update: () => void;
}

interface StockMovementControl {
	total: number;
	qntd: number;
}
