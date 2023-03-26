import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';
import { ClientService } from './services/client.service';


@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ClientRoutingModule
	],
	providers: [
		ClientService
	]
})
export class ClientModule {
}
