import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../../../services/utils.service';
import { Product } from '../../../../../product/models/product.model';
import { ProductService } from '../../../../../product/services/product.service';
import { REPORT_STOCK_VIEW_MODE_SELECT, ReportStockViewMode } from '../../../../interfaces/report-stock-view.mode';
import { BaseStockReportFilter } from '../../../../models/base-stock-report.filter';
import { BaseReport } from '../../../../models/base.report';
import { ProductStockReport, ProductStockReportGroup } from '../../models/product-stock.report';
import { ProductReportService } from '../../services/product-report.service';

@Component({
	selector: 'app-report-product-stock',
	templateUrl: './report-product-stock.component.html',
	styleUrls: ['./report-product-stock.component.scss']
})
export class ReportProductStockComponent implements OnInit {
	filter: BaseStockReportFilter = new BaseStockReportFilter();
	allProducts: Product[] = [];
	viewMode: ReportStockViewMode = 'all';
	viewModeOptions: SelectItem<ReportStockViewMode>[] = REPORT_STOCK_VIEW_MODE_SELECT;

	isLoadingSearch: boolean = false;
	isLoadingProducts: boolean = false;

	allReports: ProductStockReport[] = [];

	private reportsGroups: Map<ReportStockViewMode, ProductStockReportGroupControl>;
	private reportsFnGroups: Map<ReportStockViewMode, ProductStockReportFnGroupControl>;

	constructor(
		private productService: ProductService,
		private productReportService: ProductReportService,
		private utilsService: UtilsService
	) {
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

	get reportsDisplay(): ProductStockReportGroup[] {
		return this.reportsGroups.get(this.viewMode)!.groups;
	}

	get reportsDisplayLoaded(): boolean {
		return this.reportsGroups.get(this.viewMode)!.loaded;
	}

	ngOnInit(): void {
		this.fetchProducts();
	}

	fetchProducts(): void {
		this.isLoadingProducts = true;
		this.productService.getAll()
			.pipe(finalize(() => this.isLoadingProducts = false))
			.subscribe({
				next: (res) => this.updateProducts(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	loadReportGroups() {
		this.reportsFnGroups.get(this.viewMode)!.update();
	}

	search(): void {
		this.viewMode = 'all';
		this.reportsGroups.forEach(control => control.loaded = false);

		this.isLoadingSearch = true;
		this.productReportService.reportProductStockOverTime(this.filter)
			.pipe(finalize(() => this.isLoadingSearch = false))
			.subscribe({
				next: (res) => this.updateReport(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private updateProducts(products: Product[]): void {
		this.filter.targets = products.map(value => value.id!);
		this.allProducts = products;
	}

	private updateReport(res: ProductStockReport[]): void {
		this.allReports = res;
		this.allReports.forEach(value => value.dateTime = new Date(value.dateTime));
		this.updateReportViewAll();
	}

	private updateReportViewAll(): void {
		this.reportsGroups.set('all', { groups: [], loaded: false });

		const groups: ProductStockReportGroup[] = [];

		this.filter.targets.forEach(productId => {
			const reports = this.allReports.filter(value => value.productId === productId);

			if (reports.length > 0) {
				groups.push(new ProductStockReportGroup(reports));
			}
		});

		this.reportsGroups.set('all', { groups: groups, loaded: true });
	}

	private updateReportViewDay(): void {
		if (this.reportsGroups.get('day')!.loaded) {
			return;
		}

		this.groupReportsPerProduct('day', (reportGroup) => BaseReport.splitPerDay(reportGroup.reports));
	}

	private updateReportViewWeek(): void {
		if (this.reportsGroups.get('week')!.loaded) {
			return;
		}

		this.groupReportsPerProduct('week', (reportGroup) => BaseReport.splitPerWeek(reportGroup.reports));
	}

	private updateReportViewMonth(): void {
		if (this.reportsGroups.get('month')!.loaded) {
			return;
		}

		this.groupReportsPerProduct('month', (reportGroup) => BaseReport.splitPerMonth(reportGroup.reports));
	}

	private updateReportViewYear(): void {
		if (this.reportsGroups.get('year')!.loaded) {
			return;
		}

		this.groupReportsPerProduct('year', (reportGroup) => BaseReport.splitPerYear(reportGroup.reports));
	}

	private groupReportsPerProduct(group: ReportStockViewMode, splitFn: (reportGroup: ProductStockReportGroup) => ProductStockReport[][]): void {
		const reportGroups: ProductStockReportGroup[] = [];

		this.reportsGroups.get('all')!.groups.forEach(reportGroup => {
			const allReportsPerDay: ProductStockReport[][] = splitFn(reportGroup);
			const reports: ProductStockReport[] = [];

			allReportsPerDay.forEach(day => {
				const report: ProductStockReport = Object.assign({}, day[0]);
				let addStock: StockMovementControl = { total: 0, qntd: 0 };
				let minusStock: StockMovementControl = { total: 0, qntd: 0 };

				day.forEach(value => this.acumulateStockMovements(value.value < 0 ? minusStock : addStock, value));
				report.description = this.formatGroupedReportDescription(addStock, minusStock);
				report.value = addStock.total + minusStock.total;
				reports.push(report);
			});

			reportGroups.push(new ProductStockReportGroup(reports));
		});

		this.reportsGroups.set(group, { groups: reportGroups, loaded: true });
	}

	private acumulateStockMovements(control: StockMovementControl, value: ProductStockReport): void {
		control.total += value.value;
		control.qntd++;
	}

	private formatGroupedReportDescription(addStock: StockMovementControl, minusStock: StockMovementControl): string {
		return `${ addStock.qntd + minusStock.qntd } movimentações no estoque.<br>`
			+ `${ addStock.qntd } adições ao estoque totalizando ${ addStock.total.toFixed(1) }L.<br>`
			+ `${ minusStock.qntd } remoções no estoque totalizando ${ minusStock.total.toFixed(1) }L.`;
	}
}

interface ProductStockReportGroupControl {
	groups: ProductStockReportGroup[];
	loaded: boolean;
}

interface ProductStockReportFnGroupControl {
	update: () => void;
}

interface StockMovementControl {
	total: number;
	qntd: number;
}
