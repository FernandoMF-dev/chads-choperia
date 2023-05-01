import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ReportLobbyPlaceholderComponent } from './pages/report-lobby-placeholder/report-lobby-placeholder.component';
import { ReportLobbyComponent } from './pages/report-lobby/report-lobby.component';

import { ReportRoutingModule } from './report-routing.module';


@NgModule({
	declarations: [
		ReportLobbyComponent,
		ReportLobbyPlaceholderComponent
	],
	imports: [
		CommonModule,
		ReportRoutingModule,
		ScrollPanelModule
	]
})
export class ReportModule {
}
