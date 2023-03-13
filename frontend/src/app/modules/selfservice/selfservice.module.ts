import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RestockNotificationListComponent } from './pages/restock-notification-list/restock-notification-list.component';

import { SelfserviceRoutingModule } from './selfservice-routing.module';


@NgModule({
	declarations: [
		RestockNotificationListComponent
	],
	imports: [
		CommonModule,
		SelfserviceRoutingModule
	]
})
export class SelfserviceModule {
}
