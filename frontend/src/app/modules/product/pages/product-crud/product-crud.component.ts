import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { Product } from 'src/app/modules/product/models/product.model';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { Role } from 'src/app/modules/user/models/role.model';
import { UtilsService } from 'src/app/services/utils.service';

export interface ProductDialogProps {
  isOpen: boolean;
  updateMode: boolean;
  productToUpdate: Product;
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
  }

  deleteProductDialog: boolean = false;

  products: Product[] = [];
  roles: Role[] = [];

  product: Product = {};

  cols: any[] = [];

  _isLoading = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading(value: boolean) {
    this._isLoading = value;
  }

  constructor(private productService: ProductService, private utilsService: UtilsService) { }

  openProductFormDialog(updateProductMode?: boolean): void {
    this.dialogState.isOpen = true;
    this.dialogState.updateMode = !!updateProductMode;
    updateProductMode ? this.dialogState.productToUpdate = this.product : this.dialogState.productToUpdate = {};
  }

  ngOnInit() {
    this.fetchProducts();

    this.cols = [
      { field: 'name', header: 'Nome' },
      { field: 'stock', header: 'Quantidade em Estoque' },
      { field: 'restockThreshold', header: 'Ponto de Encomenda' },
      { field: 'barcode', header: 'Código de Barras' },
    ];
  }

  private fetchProducts(): void {
    this.isLoading = true;
    this.productService.getAll().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: (products) => this.updateProducts(products),
      error: () => this.utilsService.showErrorMessage('Erro ao carregar dados')
    })
  }

  private updateProducts(products: Product[]): void {
    this.products = products
  }

  private closeProductFormDialog() {
    this.dialogState.isOpen = false;
  }


  editProduct(product: Product) {
    this.product = product;
    this.openProductFormDialog(true);
  }

  deleteProduct(product: Product) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.productService.delete(this.product.id!).pipe(finalize(() => { this.product = {} })).subscribe({
      next: () => {
        this.products = this.products.filter(product => product.id !== this.product.id);
        this.utilsService.showSuccessMessage('Produto Removido');
      },
      error: () => this.utilsService.showErrorMessage('Erro ao Remover o produto')
    })
  }

  hideDialog() {
    this.closeProductFormDialog()
  }

  updateProductInProductsList(updatedProduct: Product): void {
    const indexInProductsArray = this.findIndexById(updatedProduct.id!);

    indexInProductsArray === -1 ?
      this.products.push(updatedProduct) :
      this.products[this.findIndexById(updatedProduct.id!)] = updatedProduct;
  }

  findIndexById(id: number): number {
    return this.products.findIndex(product => product.id === id);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
