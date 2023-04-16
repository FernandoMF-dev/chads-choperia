import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientCardCheckinComponent } from './pages/client-card-checkin/client-card-checkin.component';
import { ClientCardPaymentComponent } from './pages/client-card-payment/client-card-payment.component';

const routes: Routes = [
	{
		path: 'cliente/checkin',
		component: ClientCardCheckinComponent
	},
	{
		path: 'cliente/pagamento',
		component: ClientCardPaymentComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CardRoutingModule {
}
