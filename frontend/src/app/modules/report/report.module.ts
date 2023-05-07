import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';

import { ReportStockItemListComponent } from './components/report-stock-item-list/report-stock-item-list.component';
import { ReportLobbyPlaceholderComponent } from './pages/report-lobby-placeholder/report-lobby-placeholder.component';
import { ReportLobbyComponent } from './pages/report-lobby/report-lobby.component';
import { ReportRoutingModule } from './report-routing.module';


@NgModule({
	declarations: [
		ReportLobbyComponent,
		ReportLobbyPlaceholderComponent,
		ReportStockItemListComponent
	],
	imports: [
		CommonModule,
		ReportRoutingModule,
		ScrollPanelModule,
		TableModule
	],
	exports: [
		ReportStockItemListComponent
	]
})
export class ReportModule {
}
