import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportItemsRestockRoutingModule } from './report-items-restock-routing.module';
import { ReportItemsRestockComponent } from './pages/report-items-restock/report-items-restock.component';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  declarations: [
    ReportItemsRestockComponent
  ],
  imports: [
    CommonModule,
    ReportItemsRestockRoutingModule,
    ButtonModule,
		RippleModule,
		SharedModule,
		ToastModule,
		ToolbarModule,
		TableModule,
  ]
})
export class ReportItemsRestockModule { }
