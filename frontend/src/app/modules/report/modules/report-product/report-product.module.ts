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
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { ReportModule } from '../../report.module';
import { ReportProductStockComponent } from './pages/report-product-stock/report-product-stock.component';
import { ReportProductRoutingModule } from './report-product-routing.module';
import { ProductReportService } from './services/product-report.service';


@NgModule({
	declarations: [
		ReportProductStockComponent
	],
	imports: [
		CommonModule,
		ReportProductRoutingModule,
		ReportModule,
		AccordionModule,
		ButtonModule,
		CalendarModule,
		DropdownModule,
		MultiSelectModule,
		RippleModule,
		SharedModule,
		ToastModule,
		ToolbarModule,
		FormsModule
	],
	providers: [
		ProductReportService
	]
})
export class ReportProductModule {
}
