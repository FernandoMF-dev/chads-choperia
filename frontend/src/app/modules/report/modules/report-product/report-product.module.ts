import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReportModule } from '../../report.module';

import { ReportProductRoutingModule } from './report-product-routing.module';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ReportProductRoutingModule,
		ReportModule
	]
})
export class ReportProductModule {
}
