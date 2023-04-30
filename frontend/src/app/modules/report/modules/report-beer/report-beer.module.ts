import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportBeerStockComponent } from './pages/report-beer-stock/report-beer-stock.component';

import { ReportBeerRoutingModule } from './report-beer-routing.module';


@NgModule({
	declarations: [
		ReportBeerStockComponent
	],
	imports: [
		CommonModule,
		ReportBeerRoutingModule
	]
})
export class ReportBeerModule {
}
