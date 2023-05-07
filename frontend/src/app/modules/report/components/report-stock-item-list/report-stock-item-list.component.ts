import { Component, Input } from '@angular/core';
import { REPORT_STOCK_VIEW_MODE_DATE_FORMAT, ReportStockViewMode } from '../../interfaces/report-stock-view.mode';
import { BeerStockReport } from '../../modules/report-beer/models/beer-stock.report';

@Component({
	selector: 'app-report-stock-item-list',
	templateUrl: './report-stock-item-list.component.html',
	styleUrls: ['./report-stock-item-list.component.scss']
})
export class ReportStockItemListComponent {
	@Input() viewMode: ReportStockViewMode = 'all';
	@Input() reports: BeerStockReport[] = [];
	@Input() stockSufix: string = '';

	get dateFormat(): string {
		return REPORT_STOCK_VIEW_MODE_DATE_FORMAT.get(this.viewMode) || '';
	}
}
