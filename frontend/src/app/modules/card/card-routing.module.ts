import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteLinkUtils } from '../../utils/route-link.utils';
import { ClientCardCheckinComponent } from './pages/client-card-checkin/client-card-checkin.component';
import { ClientCardPaymentComponent } from './pages/client-card-payment/client-card-payment.component';

const routes: Routes = [
	{
		path: `${ RouteLinkUtils.CLIENTE }/${ RouteLinkUtils.ENTRANCE }`,
		component: ClientCardCheckinComponent
	},
	{
		path: `${ RouteLinkUtils.CLIENTE }/${ RouteLinkUtils.PAYMENT }`,
		component: ClientCardPaymentComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CardRoutingModule {
}
