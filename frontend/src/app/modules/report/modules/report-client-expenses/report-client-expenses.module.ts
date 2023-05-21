import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { MultiSelectModule } from 'primeng/multiselect';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { ReportClientExpensesGroupAllComponent } from './components/report-client-expenses-group-all/report-client-expenses-group-all.component';
import { ReportClientExpensesGroupClientComponent } from './components/report-client-expenses-group-client/report-client-expenses-group-client.component';
import { ReportClientExpensesGroupSellingPointComponent } from './components/report-client-expenses-group-selling-point/report-client-expenses-group-selling-point.component';
import { ReportClientExpensesComponent } from './pages/report-client-expenses/report-client-expenses.component';
import { ReportClientExpensesRoutingModule } from './report-client-expenses-routing.module';

@NgModule({
	declarations: [
		ReportClientExpensesComponent,
		ReportClientExpensesGroupAllComponent,
		ReportClientExpensesGroupClientComponent,
		ReportClientExpensesGroupSellingPointComponent
	],
	imports: [
		CommonModule,
		ReportClientExpensesRoutingModule,
		ButtonModule,
		CalendarModule,
		DropdownModule,
		MultiSelectModule,
		RippleModule,
		SharedModule,
		ToastModule,
		ToolbarModule,
		TableModule,
		FormsModule,
		InputNumberModule,
		AccordionModule
	]
})
export class ReportClientExpensesModule {
}
