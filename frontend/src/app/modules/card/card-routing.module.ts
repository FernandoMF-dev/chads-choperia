import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../layout/service/auth/AuthGuard';
import { RolesUtil } from '../../utils/RolesUtil';
import { RouteLinkUtils } from '../../utils/route-link.utils';
import { ClientCardCheckinComponent } from './pages/client-card-checkin/client-card-checkin.component';
import { ClientCardCheckoutComponent } from './pages/client-card-checkout/client-card-checkout.component';
import { ClientCardPaymentComponent } from './pages/client-card-payment/client-card-payment.component';

const routes: Routes = [
	{
		path: `${ RouteLinkUtils.CLIENTE }/${ RouteLinkUtils.ENTRANCE }`,
		data: {roles: [RolesUtil.COSTUMER_MONITOR]},
		canActivate: [AuthGuard],
		component: ClientCardCheckinComponent
	},
	{
		path: `${ RouteLinkUtils.CLIENTE }/${ RouteLinkUtils.PAYMENT }`,
		data: {roles: [RolesUtil.CASHIER]},
		canActivate: [AuthGuard],
		component: ClientCardPaymentComponent
	},
	{
		path: `${ RouteLinkUtils.CLIENTE }/${ RouteLinkUtils.EXIT }`,
		data: {roles: [RolesUtil.COSTUMER_MONITOR]},
		canActivate: [AuthGuard],
		component: ClientCardCheckoutComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CardRoutingModule {
}
