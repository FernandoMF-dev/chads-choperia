import { BaseProductStockReportGroup, BaseStockReport } from '../../../models/base-stock.report';
import { HistoricBeerActionEnum } from '../enums/historic-beer-action.enum';

export class BeerStockReport extends BaseStockReport {
	constructor(
		public rfid: string,
		action: HistoricBeerActionEnum,
		productId: number,
		productName: string,
		description: string,
		value: number,
		dateTime: Date,
		totalStock: number
	) {
		super(action, productId, productName, description, value, dateTime, totalStock);
	}
}

export class BeerStockReportGroup extends BaseProductStockReportGroup<BeerStockReport> {
	public readonly rfid: string;

	constructor(reports: BeerStockReport[]) {
		super(reports);

		if (reports.length > 0) {
			this.rfid = reports[0].rfid;
		} else {
			this.rfid = '';
		}
	}
}
