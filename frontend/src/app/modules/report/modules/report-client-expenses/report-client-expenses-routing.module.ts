import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportClientExpensesComponent } from "./pages/report-client-expenses/report-client-expenses.component";

const routes: Routes = [{ path: "", component: ReportClientExpensesComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ReportClientExpensesRoutingModule {}
