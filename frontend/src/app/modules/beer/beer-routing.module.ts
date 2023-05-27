import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../layout/service/auth/AuthGuard';
import { RolesUtil } from '../../utils/RolesUtil';
import { RouteLinkUtils } from '../../utils/route-link.utils';
import { BeerListComponent } from './pages/beer-list/beer-list.component';
import { BeerManageStockComponent } from './pages/beer-manage-stock/beer-manage-stock.component';
import { BeerPourComponent } from './pages/beer-pour/beer-pour.component';

const routes: Routes = [
	{
		path: '',
		data: {roles: [RolesUtil.ADMIN]},
		canActivate: [AuthGuard],
		component: BeerListComponent
	},
	{
		path: RouteLinkUtils.ENTRANCE,
		data: {roles: [RolesUtil.STOCK_MONITOR]},
		canActivate: [AuthGuard],
		component: BeerManageStockComponent
	},
	{
		path: RouteLinkUtils.EXIT,
		component: BeerPourComponent
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BeerRoutingModule {
}
