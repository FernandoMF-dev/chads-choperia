import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
		component: RestockNotificationListComponent
	},
	{
		path: RouteLinkUtils.FOOD_WEIGHING,
		component: FoodWeighingComponent
	},
	{
		path: RouteLinkUtils.SETTING,
		component: SelfserviceSettingsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SelfserviceRoutingModule {
}
