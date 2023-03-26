import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { UtilsService } from 'src/app/services/utils.service';
import { ManageStockProduct } from '../../models/manage-stock-product.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductDialogProps } from '../product-crud/product-crud.component';

@Component({
	selector: 'app-product-manage-stock',
	templateUrl: './product-manage-stock.component.html',
	styleUrls: [],
	providers: [ProductService, UtilsService]
})
export class ProductManageStockComponent implements OnInit {
	currentAction: 'entry' | 'removal' = 'entry';

	dialogState: ProductDialogProps = {
		isOpen: false,
		updateMode: false,
		productToUpdate: {}
	};

	products: Product[] = [];
	filteredProducts: Product[] = [];
	stockManageQueries: ManageStockProduct[] = [];
	cols: any[] = [];

	_isLoading = false;
	get isLoading(): boolean {
		return this._isLoading;
	}

	set isLoading(value: boolean) {
		this._isLoading = value;
	}

	productInput: any = '';

	constructor(private productService: ProductService, private location: Location, private utilsService: UtilsService) {
	}

	ngOnInit(): void {
		this.fetchProducts();

		this.defineCurrentActionByRoute();
		this.defineColumns();
	}

	private fetchProducts(): void {
		this.isLoading = true;
		this.productService.getAll()
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (products) => this.updateProducts(products),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private updateProducts(products: Product[]): void {
		this.products = products;
		this.filteredProducts = products;
	}

	private defineCurrentActionByRoute(): void {
		const routePaths = this.location.path().split('/');
		routePaths[routePaths.length - 1] === 'entrada' ? this.currentAction = 'entry' : this.currentAction = 'removal';
	}

	private defineColumns(): void {
		this.cols = [
			{ field: 'product.name', header: 'Produto' },
			{ field: 'amount', header: 'Quantidade' }
		];
	}

	filterProducts(event: any): void {
		this.filteredProducts = this.products.filter(product => {
			return String(product.barcode).indexOf(event.query) === 0;
		});
	}

	newStockQuery(product: Product): void {
		const productIndex = this.stockManageQueries.findIndex(query => {
			return query.product.id === product?.id;
		});

		productIndex === -1 ? this.addNewItemToList(product) : this.updateQueryAmount(productIndex);
		this.productInput = '';
	}

	private addNewItemToList(product: Product): void {
		this.stockManageQueries.push({ product: product, amount: 1 });
	}

	private updateQueryAmount(index: number): void {
		this.stockManageQueries[index].amount++;
	}

	newProductByBarcode(): void {
		const barcode = this.productInput.barcode ? String(this.productInput.barcode) : this.productInput;

		if (this.isBarcodeInvalid(barcode)) {
			this.utilsService.showErrorMessage('Código de barras inválido');
			return;
		}

		const index = this.products.findIndex(product => {
			return String(product.barcode) === barcode;
		});

		index === -1 ? this.openProductFormDialog() : this.newStockQuery(this.products[index]);
	}

	private isBarcodeInvalid(barcode: string): boolean {
		return barcode.replace(/\D/g, '').length !== 13;
	}

	deleteStockQuery(manageStockQuery: ManageStockProduct): void {
		this.stockManageQueries = this.stockManageQueries.filter(query => {
			return query.product.id !== manageStockQuery.product.id;
		});
	}

	openProductFormDialog(): void {
		this.dialogState.barcodeInput = this.productInput;
		this.dialogState.isOpen = true;
		this.productInput = '';
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

	get pageHeader(): string {
		return this.currentAction === 'entry' ? 'Entrada de Estoque' : 'Saída de Estoque';
	}

	newProductSaved(product: Product): void {
		this.products.push(product);
		this.newStockQuery(product);
	}

	handleSubmitData(): void {
		this.productService.restockProducts(this.buildDataToSave())
			.subscribe({
				next: () => {
					this.utilsService.showSuccessMessage('Movimentações cadastradas com sucesso');
					this.stockManageQueries = [];
				},
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private buildDataToSave(): ManageStockProduct[] {
		return this.stockManageQueries.map(query => {
			query.productId = query.product.id;

			if (this.currentAction === 'removal') {
				query.amount = query.amount * -1;
			}

			return query;
		});
	}
}
