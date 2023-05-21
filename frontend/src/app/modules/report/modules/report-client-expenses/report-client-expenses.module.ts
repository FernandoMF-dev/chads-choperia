import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { ReportClientExpensesComponent } from './pages/report-client-expenses/report-client-expenses.component';
import { ReportClientExpensesRoutingModule } from './report-client-expenses-routing.module';

@NgModule({
	declarations: [
		ReportClientExpensesComponent,
		ReportClientExpensesGroupAllComponent
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
		InputNumberModule
	]
})
export class ReportClientExpensesModule {
}
