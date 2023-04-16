import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteLinkUtils } from '../../utils/route-link.utils';
import { ProductCrudComponent } from './pages/product-crud/product-crud.component';
import { ProductManageStockComponent } from './pages/product-manage-stock/product-manage-stock.component';

const routes: Routes = [
	{ path: '', component: ProductCrudComponent },
	{ path: RouteLinkUtils.ENTRANCE, component: ProductManageStockComponent },
	{ path: RouteLinkUtils.EXIT, component: ProductManageStockComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductRoutingModule {
}
