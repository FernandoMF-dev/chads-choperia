import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { BeerModule } from '../../../beer/beer.module';
import { ReportModule } from '../../report.module';
import { ReportBeerConsumptionComponent } from './pages/report-beer-consumption/report-beer-consumption.component';
import { ReportBeerStockComponent } from './pages/report-beer-stock/report-beer-stock.component';
import { ReportBeerRoutingModule } from './report-beer-routing.module';
import { BeerReportService } from './services/beer-report.service';


@NgModule({
	declarations: [
		ReportBeerStockComponent,
		ReportBeerConsumptionComponent
	],
	imports: [
		CommonModule,
		ReportBeerRoutingModule,
		ReportModule,
		BeerModule,
		FormsModule,
		ReactiveFormsModule,
		ToastModule,
		ToolbarModule,
		AccordionModule,
		CalendarModule,
		MultiSelectModule,
		DropdownModule,
		RippleModule,
		TableModule
	],
	providers: [
		BeerReportService
	]
})
export class ReportBeerModule {
}
