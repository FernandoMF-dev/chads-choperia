import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { ClientService } from './services/client.service';


@NgModule({
	declarations: [
		ClientListComponent
	],
	imports: [
		CommonModule,
		ClientRoutingModule,
		TableModule,
		SkeletonModule,
		ToolbarModule,
		ToastModule,
		RippleModule,
		ButtonModule,
		InputTextModule
	],
	providers: [
		ClientService
	]
})
export class ClientModule {
}
