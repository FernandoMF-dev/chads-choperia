import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { HeaderItem } from 'src/app/models/report.model';
import { Product } from 'src/app/modules/product/models/product.model';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { ReportService } from 'src/app/services/report.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
	selector: 'app-report-items-restock',
	templateUrl: './report-items-restock.component.html',
	styleUrls: ['./report-items-restock.component.scss'],
	providers: [ProductService]
})
export class ReportItemsRestockComponent implements OnInit {
	isLoading: boolean = false;
	products: Product[] = [];

	constructor(
		private productService: ProductService,
		private utilsService: UtilsService,
		private reportService: ReportService
	) {
	}

	ngOnInit(): void {
		this.fetchProducts();
	}

	private fetchProducts(): void {
		this.isLoading = true;
		this.products = [];
		this.productService.getAll()
			.pipe(finalize(() => (this.isLoading = false)))
			.subscribe({
				next: (products) => this.updateProducts(products),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private updateProducts(products: Product[]): void {
		this.products = products.filter((product) => product.stock! <= product.restockThreshold!);
	}

	search(): void {
		this.fetchProducts();
	}

	generateReport(): void {
		const headers: HeaderItem[] = [
			{ title: 'Produto', style: { width: 70 } },
			{ title: 'Estoque Atual', style: { width: 40 } },
			{ title: 'Ponto de Encomenda', style: { width: 40 } },
			{ title: 'Status', style: { width: 20 } }
		];

		const items = this.products.map((product) => [
			product.name,
			`${ product.stock }un\n`,
			`${ product.restockThreshold }un`,
			product.stock! <= 0 ? 'Em falta' : 'Acabando'
		]);

		this.reportService.generateReport('Relatório Ponto de Encomenda', 'relatorio-ponto-encomenda', headers, items);
	}
}
