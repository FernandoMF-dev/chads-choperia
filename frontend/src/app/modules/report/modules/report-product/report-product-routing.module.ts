import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteLinkUtils } from '../../../../utils/route-link.utils';
import { ReportItemsRestockComponent } from './pages/report-items-restock/report-items-restock.component';
import { ReportProductStockComponent } from './pages/report-product-stock/report-product-stock.component';

const routes: Routes = [
	{
		path: RouteLinkUtils.STOCK,
		component: ReportProductStockComponent
	},
	{
		path: RouteLinkUtils.RESTOCK,
		component: ReportItemsRestockComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportProductRoutingModule {
}
