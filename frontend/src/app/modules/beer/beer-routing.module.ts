import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerListComponent } from './pages/beer-list/beer-list.component';
import { BeerPourComponent } from './pages/beer-pour/beer-pour.component';

const routes: Routes = [
	{ path: '', component: BeerListComponent },
	{ path: 'saida', component: BeerPourComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BeerRoutingModule {
}
