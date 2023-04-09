import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientCardLinkComponent } from './pages/client-card-link/client-card-link.component';

const routes: Routes = [
	{
		path: 'cliente/vincular',
		component: ClientCardLinkComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CardRoutingModule {
}
