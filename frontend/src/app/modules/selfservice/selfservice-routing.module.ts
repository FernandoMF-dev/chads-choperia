import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteLinkUtils } from '../../utils/route-link.utils';
import { RestockNotificationListComponent } from './pages/restock-notification-list/restock-notification-list.component';
import { FoodWeighingComponent } from './pages/food-weighing/food-weighing.component';

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
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SelfserviceRoutingModule {
}
