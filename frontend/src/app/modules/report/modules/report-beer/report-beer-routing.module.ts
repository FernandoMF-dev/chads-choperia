import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportBeerStockComponent } from './pages/report-beer-stock/report-beer-stock.component';

const routes: Routes = [
	{
		path: '',
		component: ReportBeerStockComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportBeerRoutingModule {
}
