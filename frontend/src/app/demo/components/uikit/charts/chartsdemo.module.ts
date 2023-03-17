import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { ChartsDemoRoutingModule } from './chartsdemo-routing.module';
import { ChartsDemoComponent } from './chartsdemo.component';

@NgModule({
	imports: [
		CommonModule,
		ChartsDemoRoutingModule,
		ChartModule
	],
	declarations: [ChartsDemoComponent]
})
export class ChartsDemoModule {
}
