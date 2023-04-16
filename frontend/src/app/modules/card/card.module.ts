import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

import { CardRoutingModule } from './card-routing.module';
import { ClientCardCheckinComponent } from './pages/client-card-checkin/client-card-checkin.component';
import { ClientCardCheckoutComponent } from './pages/client-card-checkout/client-card-checkout.component';
import { ClientCardPaymentComponent } from './pages/client-card-payment/client-card-payment.component';
import { ClientCardService } from './services/client-card.service';


@NgModule({
	declarations: [
		ClientCardCheckinComponent,
		ClientCardPaymentComponent,
		ClientCardCheckoutComponent
	],
	imports: [
		CommonModule,
		CardRoutingModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		InputNumberModule,
		ReactiveFormsModule,
		DropdownModule,
		InputTextModule,
		TableModule,
		TooltipModule,
		SkeletonModule,
		FormsModule
	],
	providers: [
		ClientCardService
	]
})
export class CardModule {
}
