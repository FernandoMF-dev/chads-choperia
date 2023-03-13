import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestockNotificationListComponent } from './pages/restock-notification-list/restock-notification-list.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'restock',
		pathMatch: 'full'
	},
	{
		path: 'restock',
		component: RestockNotificationListComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SelfserviceRoutingModule {
}
