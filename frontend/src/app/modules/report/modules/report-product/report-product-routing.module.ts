import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportProductStockComponent } from './pages/report-product-stock/report-product-stock.component';

const routes: Routes = [
	{
		path: '',
		component: ReportProductStockComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportProductRoutingModule {
}
