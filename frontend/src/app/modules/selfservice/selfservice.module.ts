import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { RestockNotificationListComponent } from './pages/restock-notification-list/restock-notification-list.component';

import { SelfserviceRoutingModule } from './selfservice-routing.module';
import { RestockNotificationService } from './services/restock-notification.service';


@NgModule({
	declarations: [
		RestockNotificationListComponent
	],
	imports: [
		SelfserviceRoutingModule,
		CommonModule,
		TableModule,
		SkeletonModule,
		ButtonModule
	],
	providers: [
		RestockNotificationService
	]
})
export class SelfserviceModule {
}
