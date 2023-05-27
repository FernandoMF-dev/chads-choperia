import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../layout/service/auth/AuthGuard';
import { RolesUtil } from '../../utils/RolesUtil';
import { RouteLinkUtils } from '../../utils/route-link.utils';
import { ProductCrudComponent } from './pages/product-crud/product-crud.component';
import { ProductManageStockComponent } from './pages/product-manage-stock/product-manage-stock.component';

const routes: Routes = [
	{
		path: '',
		data: {roles: [RolesUtil.ADMIN]},
		canActivate: [AuthGuard],
		component: ProductCrudComponent
	},
	{
		path: RouteLinkUtils.ENTRANCE,
		data: {roles: [RolesUtil.STOCK_MONITOR]},
		canActivate: [AuthGuard],
		component: ProductManageStockComponent
	},
	{
		path: RouteLinkUtils.EXIT,
		data: {roles: [RolesUtil.COOK]},
		canActivate: [AuthGuard],
		component: ProductManageStockComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductRoutingModule {
}
