import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { CardRoutingModule } from './card-routing.module';
import { ClientCardLinkComponent } from './pages/client-card-link/client-card-link.component';
import { ClientCardService } from './services/client-card.service';


@NgModule({
	declarations: [
		ClientCardLinkComponent
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
		DropdownModule
	],
	providers: [
		ClientCardService
	]
})
export class CardModule {
}
