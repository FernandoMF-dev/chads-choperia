import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EmptyDemoRoutingModule } from './emptydemo-routing.module';
import { EmptyDemoComponent } from './emptydemo.component';

@NgModule({
	imports: [
		CommonModule,
		EmptyDemoRoutingModule
	],
	declarations: [EmptyDemoComponent]
})
export class EmptyDemoModule {
}
