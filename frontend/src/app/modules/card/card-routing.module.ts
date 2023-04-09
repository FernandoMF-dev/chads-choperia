import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientCardCheckinComponent } from './pages/client-card-checkin/client-card-checkin.component';
import { ClientCardCheckoutComponent } from './pages/client-card-checkout/client-card-checkout.component';

const routes: Routes = [
	{
		path: 'cliente/checkin',
		component: ClientCardCheckinComponent
	},
	{
		path: 'cliente/checkout',
		component: ClientCardCheckoutComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CardRoutingModule {
}
