import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientCardCheckinComponent } from './pages/client-card-checkin/client-card-checkin.component';

const routes: Routes = [
	{
		path: 'cliente/checkin',
		component: ClientCardCheckinComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CardRoutingModule {
}
