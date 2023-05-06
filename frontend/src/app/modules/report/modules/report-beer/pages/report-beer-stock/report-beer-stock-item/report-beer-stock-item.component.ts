import { Component, Input } from '@angular/core';
import { REPORT_BEER_STOCK_VIEW_MODE_DATE_FORMAT, ReportBeerStockViewMode } from '../../../interfaces/report-beer-stock-view.mode';
import { BeerStockReportGroup } from '../../../models/beer-stock.report';

@Component({
	selector: 'app-report-beer-stock-item',
	templateUrl: './report-beer-stock-item.component.html',
	styleUrls: ['./report-beer-stock-item.component.scss']
})
export class ReportBeerStockItemComponent {
	@Input() viewMode: ReportBeerStockViewMode = 'all';
	@Input() reports: BeerStockReportGroup[] = [];

	get dateFormat(): string {
		return REPORT_BEER_STOCK_VIEW_MODE_DATE_FORMAT.get(this.viewMode) || '';
	}
}
