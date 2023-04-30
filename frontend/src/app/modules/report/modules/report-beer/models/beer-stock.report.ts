import { BaseReport } from '../../../models/base.report';

export class BeerStockReport extends BaseReport {
	constructor(description: string, value: number, dateTime: Date) {
		super(description, value, dateTime);
	}
}
