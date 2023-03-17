import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';

@NgModule({
	imports: [
		CommonModule,
		ErrorRoutingModule,
		ButtonModule
	],
	declarations: [ErrorComponent]
})
export class ErrorModule {
}
