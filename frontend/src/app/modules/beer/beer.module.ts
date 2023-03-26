import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

import { BeerRoutingModule } from './beer-routing.module';
import { BeerListComponent } from './pages/beer-list/beer-list.component';
import { BeerService } from './services/beer.service';


@NgModule({
	declarations: [
		BeerListComponent
	],
	imports: [
		CommonModule,
		BeerRoutingModule,
		TableModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		SkeletonModule,
		InputTextModule,
		TooltipModule
	],
	providers: [
		BeerService
	]
})
export class BeerModule {
}
