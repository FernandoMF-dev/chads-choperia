import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReportClientExpensesRoutingModule } from "./report-client-expenses-routing.module";
import { ReportClientExpensesComponent } from "./pages/report-client-expenses/report-client-expenses.component";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { RippleModule } from "primeng/ripple";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";

@NgModule({
	declarations: [ReportClientExpensesComponent],
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
	],
})
export class ReportClientExpensesModule {}
