import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { TreeDemoRoutingModule } from './treedemo-routing.module';
import { TreeDemoComponent } from './treedemo.component';

@NgModule({
	imports: [
		CommonModule,
		TreeDemoRoutingModule,
		FormsModule,
		TreeModule,
		TreeTableModule
	],
	declarations: [TreeDemoComponent]
})
export class TreeDemoModule {
}
