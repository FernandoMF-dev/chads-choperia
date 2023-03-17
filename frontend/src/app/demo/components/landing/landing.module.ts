import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { StyleClassModule } from 'primeng/styleclass';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

@NgModule({
	imports: [
		CommonModule,
		LandingRoutingModule,
		DividerModule,
		StyleClassModule,
		ChartModule,
		PanelModule,
		ButtonModule
	],
	declarations: [LandingComponent]
})
export class LandingModule {
}
