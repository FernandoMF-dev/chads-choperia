import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteLinkUtils } from '../../utils/route-link.utils';
import { BeerListComponent } from './pages/beer-list/beer-list.component';
import { BeerManageStockComponent } from './pages/beer-manage-stock/beer-manage-stock.component';
import { BeerPourComponent } from './pages/beer-pour/beer-pour.component';

const routes: Routes = [
	{ path: '', component: BeerListComponent },
	{ path: RouteLinkUtils.ENTRANCE, component: BeerManageStockComponent },
	{ path: RouteLinkUtils.EXIT, component: BeerPourComponent }
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BeerRoutingModule {
}
