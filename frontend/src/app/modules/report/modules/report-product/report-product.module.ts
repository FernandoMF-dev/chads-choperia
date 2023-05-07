import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReportModule } from '../../report.module';
import { ReportProductStockComponent } from './pages/report-product-stock/report-product-stock.component';
import { ReportProductRoutingModule } from './report-product-routing.module';
import { ProductReportService } from './services/product-report.service';


@NgModule({
	declarations: [
		ReportProductStockComponent
	],
	imports: [
		CommonModule,
		ReportProductRoutingModule,
		ReportModule
	],
	providers: [
		ProductReportService
	]
})
export class ReportProductModule {
}
