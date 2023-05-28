import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { ProductModule } from '../../../product/product.module';
import { ReportModule } from '../../report.module';
import { ReportItemsRestockComponent } from './pages/report-items-restock/report-items-restock.component';
import { ReportProductStockComponent } from './pages/report-product-stock/report-product-stock.component';
import { ReportProductRoutingModule } from './report-product-routing.module';
import { ProductReportService } from './services/product-report.service';


@NgModule({
	declarations: [
		ReportProductStockComponent,
		ReportItemsRestockComponent
	],
	imports: [
		CommonModule,
		ReportProductRoutingModule,
		ReportModule,
		ProductModule,
		AccordionModule,
		ButtonModule,
		CalendarModule,
		DropdownModule,
		MultiSelectModule,
		RippleModule,
		SharedModule,
		ToastModule,
		ToolbarModule,
		FormsModule,
		TableModule
	],
	providers: [
		ProductReportService
	]
})
export class ReportProductModule {
}
