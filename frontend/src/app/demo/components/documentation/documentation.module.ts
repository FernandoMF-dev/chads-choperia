import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { DocumentationComponent } from './documentation.component';

@NgModule({
	imports: [
		CommonModule,
		DocumentationRoutingModule
	],
	declarations: [DocumentationComponent]
})
export class DocumentationModule {
}
