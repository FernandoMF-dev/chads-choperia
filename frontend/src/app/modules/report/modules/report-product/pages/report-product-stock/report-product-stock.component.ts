import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../../../services/utils.service';
import { Product } from '../../../../../product/models/product.model';
import { ProductService } from '../../../../../product/services/product.service';
import { REPORT_STOCK_VIEW_MODE_SELECT, ReportStockViewMode } from '../../../../interfaces/report-stock-view.mode';
import { ReportStockComponentUtils } from '../../../../utils/report-stock-component.utils';
import { ProductStockReport, ProductStockReportGroup } from '../../models/product-stock.report';
import { ProductReportService } from '../../services/product-report.service';
import { HeaderItem } from 'src/app/models/report.model';
import * as moment from 'moment';
import { ReportService } from 'src/app/services/report.service';
import { CurrencyPipe } from '@angular/common';

@Component({
	selector: 'app-report-product-stock',
	templateUrl: './report-product-stock.component.html',
	styleUrls: ['./report-product-stock.component.scss'],
	providers: [CurrencyPipe]
})
export class ReportProductStockComponent extends ReportStockComponentUtils<ProductStockReport, ProductStockReportGroup> implements OnInit {
	allProducts: Product[] = [];
	viewMode: ReportStockViewMode = 'all';
	viewModeOptions: SelectItem<ReportStockViewMode>[] = REPORT_STOCK_VIEW_MODE_SELECT;

	isLoadingSearch: boolean = false;
	isLoadingProducts: boolean = false;

	cols = [
		{ dataKey: 'description', title: 'Descrição'},
		{ dataKey: 'value', title: 'Valor'},
		{ dataKey: 'totalStock', title: 'Estoque' },
		{ dataKey: 'dateTime', title: 'Data & Hora' },
	];

	constructor(
		private productService: ProductService,
		private productReportService: ProductReportService,
		private utilsService: UtilsService,
		private reportService: ReportService,
		private currencyPipe: CurrencyPipe
	) {
		super();
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

	public getUnitSufix(): string {
		return ' un';
	}

	protected newStockReportGroup(reports: ProductStockReport[]): ProductStockReportGroup {
		return new ProductStockReportGroup(reports);
	}


	public exportPdf(){
		const headers: HeaderItem[] = [
			{ title: "Descrição", style: { width: 110 } },
			{ title: "Valor", style: { width: 20 } },
			{ title: "Estoque", style: { width: 20 } },
			{ title: "Data & Hora", style: { width: 20 } },
		];

		this.reportsDisplay.forEach((reportDisplay) => {
			const items = reportDisplay.reports.map((productReport) => [
				productReport.description + "\n",
				`${productReport.value}un`,
				`${productReport.totalStock}un`,
				moment(productReport.dateTime).format("DD/MM/YYYY hh:MM:SS"),
			]);
			this.reportService.generateReport(
				`Relatório Estoque ${reportDisplay.productName}`,
				`relatorio-${String(reportDisplay.productName).toLowerCase().replace(/ /g, "-")}`,
				headers,
				items
			);
		});
	}
}
