import { Component, OnInit } from '@angular/core';
import * as jsBarcode from 'jsbarcode';
import { jsPDF } from 'jspdf';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { Product } from 'src/app/modules/product/models/product.model';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { UtilsService } from 'src/app/services/utils.service';

export interface ProductDialogProps {
	isOpen: boolean;
	updateMode: boolean;
	productToUpdate: Product;
	barcodeInput?: string;
}

interface productBarcodePrint extends Product {
	amount?: number;
}

@Component({
	selector: 'app-product-crud',
	templateUrl: './product-crud.component.html',
	styleUrls: [],
	providers: [UtilsService]
})
export class ProductCrudComponent implements OnInit {
	dialogState: ProductDialogProps = {
		isOpen: false,
		updateMode: false,
		productToUpdate: {}
	};

	products: Product[] = [];

	selectedProducts: productBarcodePrint[] = [];

	product: Product = {};

	cols: any[] = [];

	printingBarcodeMode = false;
	_isLoading = false;

	get isLoading(): boolean {
		return this._isLoading;
	}

	set isLoading(value: boolean) {
		this._isLoading = value;
	}

	constructor(
		private productService: ProductService,
		private utilsService: UtilsService
	) {
	}

	openProductFormDialog(updateProductMode?: boolean): void {
		this.dialogState.isOpen = true;
		this.dialogState.updateMode = !!updateProductMode;
		updateProductMode ? (this.dialogState.productToUpdate = this.product) : (this.dialogState.productToUpdate = {});
	}

	ngOnInit() {
		this.fetchProducts();

		this.cols = [
			{ field: 'name', header: 'Nome' },
			{ field: 'stock', header: 'Quantidade em Estoque' },
			{ field: 'restockThreshold', header: 'Ponto de Encomenda' },
			{ field: 'barcode', header: 'Código de Barras' }
		];
	}

	private fetchProducts(): void {
		this.isLoading = true;
		this.selectedProducts = [];
		this.productService.getAll()
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (products) => this.updateProducts(products),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private updateProducts(products: Product[]): void {
		this.products = products;
	}

	private closeProductFormDialog() {
		this.dialogState.isOpen = false;
	}

	editProduct(product: Product) {
		this.product = product;
		this.openProductFormDialog(true);
	}

	confirmDeleteProduct(product: Product) {
		this.product = { ...product };
		this.utilsService.displayConfirmationMessage(
			'Excluir produto',
			`Tem certeza que deseja deletar <strong>${ this.product.name }</strong>?`,
			this,
			() => this.deleteProduct()
		);
	}

	deleteProduct() {
		this.productService.delete(this.product.id!)
			.pipe(finalize(() => this.product = {}))
			.subscribe({
				next: () => {
					this.products = this.products.filter(product => product.id !== this.product.id);
					this.utilsService.showSuccessMessage('Produto Removido');
				},
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	hideDialog() {
		this.closeProductFormDialog();
	}

	updateProductInProductsList(updatedProduct: Product): void {
		const indexInProductsArray = this.findIndexById(updatedProduct.id!);

		indexInProductsArray === -1
			? this.products.push(updatedProduct)
			: (this.products[this.findIndexById(updatedProduct.id!)] = updatedProduct);
	}

	findIndexById(id: number): number {
		return this.products.findIndex((product) => product.id === id);
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

	handlePrintBarcodes(): void {
		const canvas = document.createElement('canvas');
		const pdf = new jsPDF('l', 'mm', [115, 23]);
		const spacingBetweenTickets = 1.3;
		const barcodeSize = 36.6;
		let positionBuffer = spacingBetweenTickets;

		this.selectedProducts.forEach((product) => {
			if (!product.barcode) {
				return;
			}
			if (!product.amount) {
				product.amount = 1;
			}

			for (let i = 0; i < product.amount; i++) {
				if (positionBuffer >= 110) {
					pdf.addPage();
					positionBuffer = spacingBetweenTickets;
				}

				jsBarcode(canvas, product.barcode!);
				pdf.addImage(canvas.toDataURL('image/jpeg'), 'JPEG', positionBuffer, 0, barcodeSize, 20.4);
				positionBuffer += barcodeSize + spacingBetweenTickets;
			}
		});

		pdf.autoPrint();
		pdf.output('dataurlnewwindow');
	}

	togglePrintingBarcodeMode(): void {
		this.selectedProducts = [];
		this.products.forEach(value => (value as productBarcodePrint).amount = undefined);
		this.printingBarcodeMode = !this.printingBarcodeMode;
	}
}
