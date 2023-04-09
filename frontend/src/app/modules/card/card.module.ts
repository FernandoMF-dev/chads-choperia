import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardRoutingModule } from './card-routing.module';
import { ClientCardService } from './services/client-card.service';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		CardRoutingModule
	],
	providers: [
		ClientCardService
	]
})
export class CardModule {
}
