import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BeerRoutingModule } from './beer-routing.module';
import { BeerService } from './services/beer.service';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		BeerRoutingModule
	],
	providers: [
		BeerService
	]
})
export class BeerModule {
}
