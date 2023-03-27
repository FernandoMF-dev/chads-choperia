import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { Product } from 'src/app/modules/product/models/product.model';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ProductDialogProps } from '../../product-crud/product-crud.component';

@Component({
	selector: 'app-product-form-modal',
	templateUrl: './product-form-modal.component.html',
	styleUrls: [],
	providers: [UtilsService]
})
export class ProductFormModalComponent {
	@Input() dialogState: ProductDialogProps = {
		isOpen: false,
		updateMode: false,
		productToUpdate: {}
	};
	@Output() productSaved = new EventEmitter<Product>();

	productForm: FormGroup;

	_isLoading = false;

	get isLoading(): boolean {
		return this._isLoading;
	}

	set isLoading(value: boolean) {
		value ? this.productForm.disable() : this.productForm.enable();
		this._isLoading = value;
	}

	constructor(private productService: ProductService, private utilsService: UtilsService) {
		this.productForm = new FormGroup({
			id: new FormControl(null),
			name: new FormControl('', [Validators.required, Validators.minLength(3)]),
			stock: new FormControl(0, [Validators.required]),
			restockThreshold: new FormControl(0, [Validators.required]),
			barcode: new FormControl(null, [Validators.required, Validators.minLength(13), Validators.maxLength(13)])
		});
	}

	isFieldValid(fieldName: string): boolean | undefined {
		return this.utilsService.isFieldValid(this.productForm, fieldName);
	}

	formOpenned(): void {
		this.productForm.reset();
		this.checkBarcodeInput();
		this.checkUpdateProductMode();
	}

	private checkBarcodeInput(): void {
		if (this.dialogState.barcodeInput) {
			this.productForm.patchValue({ barcode: this.dialogState.barcodeInput });
		}

		this.dialogState.barcodeInput = undefined;
	}

	private checkUpdateProductMode(): void {
		if (this.dialogState.updateMode) {
			this.productForm.patchValue(this.dialogState.productToUpdate);
		}
	}

	private clearProduct(): void {
		this.dialogState.productToUpdate = {};
		this.dialogState.updateMode = false;
	}

	closeDialog(): void {
		this.dialogState.isOpen = false;
		this.productForm.reset();
	}

	async saveProduct() {
		this.isLoading = true;
		this.dialogState.updateMode ? await this.updateProduct() : await this.registerNewProduct();

		this.closeDialog();
		this.clearProduct();
		this.isLoading = false;
	}

	private registerNewProduct(): Promise<void> {
		return new Promise((resolve) => {
			this.productService.create(this.productForm.value)
				.pipe(finalize(() => resolve()))
				.subscribe({
					next: (newProduct) => {
						this.productSaved.emit(newProduct);
						this.utilsService.showSuccessMessage('Produto Criado');
					},
					error: (err) => this.utilsService.showErrorMessage(err.error.detail)
				});
		});
	}

	private updateProduct(): Promise<void> {
		return new Promise((resolve) => {
			this.productService
				.update(this.productForm.value)
				.pipe(finalize(() => resolve()))
				.subscribe({
					next: (updatedProduct) => {
						this.productSaved.emit(updatedProduct);
						this.utilsService.showSuccessMessage(`Produto ${ updatedProduct.name } alterado`);
					},
					error: (err) => this.utilsService.showErrorMessage(err.error.detail)
				});
		});
	}

}
