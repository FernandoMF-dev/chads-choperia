import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportItemsRestockComponent } from "./pages/report-items-restock/report-items-restock.component";

const routes: Routes = [{ path: "", component: ReportItemsRestockComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ReportItemsRestockRoutingModule {}
