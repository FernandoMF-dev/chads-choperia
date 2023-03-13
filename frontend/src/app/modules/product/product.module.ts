import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ProductService } from 'src/app/modules/product/services/product.service';
import { ProductFormModalComponent } from './pages/components/product-form-modal/product-form-modal.component';
import { ProductCrudComponent } from './pages/product-crud/product-crud.component';
import { ProductManageStockComponent } from './pages/product-manage-stock/product-manage-stock.component';


import { ProductRoutingModule } from './product-routing.module';


@NgModule({
	declarations: [
		ProductCrudComponent,
		ProductManageStockComponent,
		ProductFormModalComponent
	],
	imports: [
		CommonModule,
		ProductRoutingModule,
		TableModule,
		FileUploadModule,
		ReactiveFormsModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		RatingModule,
		InputTextModule,
		InputTextareaModule,
		DropdownModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,
		SkeletonModule,
		InputMaskModule
	],
	providers: [ProductService]
})
export class ProductModule {
}
