import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportModule } from '../../report.module';

import { ReportProductRoutingModule } from './report-product-routing.module';
import { ProductReportService } from './services/product-report.service';


@NgModule({
	declarations: [],
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
