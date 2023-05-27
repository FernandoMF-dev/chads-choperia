import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../layout/service/auth/AuthGuard';
import { RolesUtil } from '../../utils/RolesUtil';
import { RouteLinkUtils } from '../../utils/route-link.utils';
import { FoodWeighingComponent } from './pages/food-weighing/food-weighing.component';
import { RestockNotificationListComponent } from './pages/restock-notification-list/restock-notification-list.component';
import { SelfserviceSettingsComponent } from './pages/selfservice-settings/selfservice-settings.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: RouteLinkUtils.RESTOCK,
		pathMatch: 'full'
	},
	{
		path: RouteLinkUtils.RESTOCK,
		data: {roles: [RolesUtil.COOK]},
		canActivate: [AuthGuard],
		component: RestockNotificationListComponent
	},
	{
		path: RouteLinkUtils.FOOD_WEIGHING,
		component: FoodWeighingComponent
	},
	{
		path: RouteLinkUtils.SETTING,
		data: {roles: [RolesUtil.ADMIN]},
		canActivate: [AuthGuard],
		component: SelfserviceSettingsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SelfserviceRoutingModule {
}
