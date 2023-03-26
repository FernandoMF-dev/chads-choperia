import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeerListComponent } from './pages/beer-list/beer-list.component';

const routes: Routes = [
	{ path: '', component: BeerListComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BeerRoutingModule {
}
