import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IconsComponent } from './icons/icons.component';
import { UtilitiesRoutingModule } from './utilities-routing.module';

@NgModule({
	imports: [
		CommonModule,
		UtilitiesRoutingModule,
		InputTextModule
	],
	declarations: [IconsComponent]
})
export class UtilitiesModule {
}
