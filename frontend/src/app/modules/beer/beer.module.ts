import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';

import { BeerRoutingModule } from './beer-routing.module';
import { BeerFormComponent } from './components/beer-form/beer-form.component';
import { BeerListComponent } from './pages/beer-list/beer-list.component';
import { BeerPourComponent } from './pages/beer-pour/beer-pour.component';
import { BeerService } from './services/beer.service';


@NgModule({
	declarations: [
		BeerListComponent,
		BeerFormComponent,
		BeerPourComponent
	],
	imports: [
		CommonModule,
		BeerRoutingModule,
		DropdownModule,
		TableModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		SkeletonModule,
		InputTextModule,
		TooltipModule,
		DialogModule,
		ReactiveFormsModule,
		InputNumberModule,
		FormsModule
	],
	providers: [
		BeerService
	]
})
export class BeerModule {
}
