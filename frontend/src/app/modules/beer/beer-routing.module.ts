import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerListComponent } from './pages/beer-list/beer-list.component';
import { BeerManageStockComponent } from './pages/beer-manage-stock/beer-manage-stock.component';
import { BeerPourComponent } from './pages/beer-pour/beer-pour.component';

const routes: Routes = [
	{ path: '', component: BeerListComponent },
	{ path: 'entrada', component: BeerManageStockComponent },
	{ path: 'saida', component: BeerPourComponent }
]


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BeerRoutingModule {
}
