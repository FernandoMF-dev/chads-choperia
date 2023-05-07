import { Component, Input } from '@angular/core';
import {
	REPORT_BEER_STOCK_VIEW_MODE_DATE_FORMAT,
	ReportBeerStockViewMode
} from '../../modules/report-beer/interfaces/report-beer-stock-view.mode';
import { BeerStockReport } from '../../modules/report-beer/models/beer-stock.report';

@Component({
	selector: 'app-report-stock-item-list',
	templateUrl: './report-stock-item-list.component.html',
	styleUrls: ['./report-stock-item-list.component.scss']
})
export class ReportStockItemListComponent {
	@Input() viewMode: ReportBeerStockViewMode = 'all';
	@Input() reports: BeerStockReport[] = [];
	@Input() stockSufix: string = '';

	get dateFormat(): string {
		return REPORT_BEER_STOCK_VIEW_MODE_DATE_FORMAT.get(this.viewMode) || '';
	}
}
