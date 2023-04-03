import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { InputMaskModule } from 'primeng/inputmask';


import { BeerRoutingModule } from './beer-routing.module';
import { BeerFormComponent } from './components/beer-form/beer-form.component';
import { BeerListComponent } from './pages/beer-list/beer-list.component';
import { BeerService } from './services/beer.service';
import { BeerManageStockComponent } from './pages/beer-manage-stock/beer-manage-stock.component';


@NgModule({
	declarations: [
		BeerListComponent,
		BeerFormComponent,
  BeerManageStockComponent
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
		TooltipModule,
		DialogModule,
		ReactiveFormsModule,
		InputNumberModule,
		InputMaskModule,
		FormsModule
	],
	providers: [
		BeerService
	]
})
export class BeerModule {
}
