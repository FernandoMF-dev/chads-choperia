import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { ReportBeerStockItemComponent } from './pages/report-beer-stock/report-beer-stock-item/report-beer-stock-item.component';
import { ReportBeerStockComponent } from './pages/report-beer-stock/report-beer-stock.component';
import { ReportBeerRoutingModule } from './report-beer-routing.module';
import { BeerReportService } from './services/beer-report.service';


@NgModule({
	declarations: [
		ReportBeerStockComponent,
		ReportBeerStockItemComponent
	],
	imports: [
		CommonModule,
		ReportBeerRoutingModule,
		FormsModule,
		InputTextModule,
		ReactiveFormsModule,
		ToastModule,
		ToolbarModule,
		CalendarModule,
		MultiSelectModule,
		RippleModule,
		TableModule,
		DropdownModule,
		AccordionModule
	],
	providers: [
		BeerReportService
	]
})
export class ReportBeerModule {
}
