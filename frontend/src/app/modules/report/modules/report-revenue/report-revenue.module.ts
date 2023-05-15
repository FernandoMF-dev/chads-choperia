import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRevenueRoutingModule } from './report-revenue-routing.module';
import { ReportRevenueComponent } from './pages/report-revenue/report-revenue.component';
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
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    ReportRevenueComponent
  ],
  imports: [
    CommonModule,
    ReportRevenueRoutingModule,
    AccordionModule,
		ButtonModule,
		CalendarModule,
		DropdownModule,
		MultiSelectModule,
		RippleModule,
		SharedModule,
		ToastModule,
		ToolbarModule,
		TableModule,
		FormsModule
  ]
})
export class ReportRevenueModule { }
