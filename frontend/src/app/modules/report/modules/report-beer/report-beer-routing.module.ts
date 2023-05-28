import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteLinkUtils } from '../../../../utils/route-link.utils';
import { ReportBeerConsumptionComponent } from './pages/report-beer-consumption/report-beer-consumption.component';
import { ReportBeerStockComponent } from './pages/report-beer-stock/report-beer-stock.component';

const routes: Routes = [
	{
		path: RouteLinkUtils.STOCK,
		component: ReportBeerStockComponent
	},
	{
		path: RouteLinkUtils.EXIT,
		component: ReportBeerConsumptionComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportBeerRoutingModule {
}
