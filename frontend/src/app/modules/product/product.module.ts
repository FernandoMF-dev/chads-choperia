import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { SkeletonModule } from 'primeng/skeleton';


import { ProductRoutingModule } from './product-routing.module';
import { ProductCrudComponent } from './pages/product-crud/product-crud.component';
import { ProductManageStockComponent } from './pages/product-manage-stock/product-manage-stock.component';
import { ProductFormModalComponent } from './pages/components/product-form-modal/product-form-modal.component';
import { ProductService } from 'src/app/services/product.service';
import { InputMaskModule } from 'primeng/inputmask';


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
export class ProductModule { }
