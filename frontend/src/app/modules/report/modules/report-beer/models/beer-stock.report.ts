import { BaseReport } from '../../../models/base.report';
import { HistoricBeerActionEnum } from '../enums/historic-beer-action.enum';

export class BeerStockReport extends BaseReport {
	constructor(
		public action: HistoricBeerActionEnum,
		description: string,
		value: number,
		dateTime: Date,
		public totalStock: number
	) {
		super(description, value, dateTime);
	}
}
