import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteLinkUtils } from '../../utils/route-link.utils';
import { ReportLobbyPlaceholderComponent } from './pages/report-lobby-placeholder/report-lobby-placeholder.component';
import { ReportLobbyComponent } from './pages/report-lobby/report-lobby.component';

const routes: Routes = [
	{
		path: '',
		component: ReportLobbyComponent,
		children: [
			{
				path: '',
				component: ReportLobbyPlaceholderComponent
			},
			{
				path: RouteLinkUtils.BEER,
				loadChildren: () => import('./modules/report-beer/report-beer.module').then(m => m.ReportBeerModule)
			},
			{
				path: RouteLinkUtils.PRODUCT,
				loadChildren: () => import('./modules/report-product/report-product.module').then(m => m.ReportProductModule)
			},
			{
				path: RouteLinkUtils.REVENUE_EXPENSE,
				loadChildren: () => import('./modules/report-revenue/report-revenue.module').then(m => m.ReportRevenueModule)
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class ReportRoutingModule {
}
