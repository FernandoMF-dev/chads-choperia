import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { RestockNotificationFormComponent } from './components/restock-notification-form/restock-notification-form.component';
import { FoodWeighingComponent } from './pages/food-weighing/food-weighing.component';
import { RestockNotificationListComponent } from './pages/restock-notification-list/restock-notification-list.component';
import { SelfserviceRoutingModule } from './selfservice-routing.module';
import { RestockNotificationService } from './services/restock-notification.service';
import { SelfserviceService } from './services/selfservice.service';


@NgModule({
	declarations: [
		RestockNotificationListComponent,
		RestockNotificationFormComponent,
		FoodWeighingComponent
	],
	imports: [
		SelfserviceRoutingModule,
		CommonModule,
		TableModule,
		SkeletonModule,
		ButtonModule,
		DialogModule,
		ReactiveFormsModule,
		InputTextModule,
		InputNumberModule,
		RippleModule,
		ToastModule,
		ToolbarModule
	],
	providers: [
		RestockNotificationService,
		SelfserviceService
	]
})
export class SelfserviceModule {
}
