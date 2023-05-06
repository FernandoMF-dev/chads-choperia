import { BaseReport } from '../../../models/base.report';
import { HistoricBeerActionEnum } from '../enums/historic-beer-action.enum';

export class BeerStockReport extends BaseReport {
	constructor(
		public action: HistoricBeerActionEnum,
		public beerId: number,
		public beerName: string,
		public rfid: string,
		description: string,
		value: number,
		dateTime: Date,
		public totalStock: number
	) {
		super(description, value, dateTime);
	}
}

export class BeerStockReportGroup {
	public readonly beerId: number;
	public readonly beerName: string;
	public readonly rfid: string;

	constructor(
		public readonly reports: BeerStockReport[]
	) {
		if (reports.length > 0) {
			const aux = reports[0];
			this.beerId = aux.beerId;
			this.beerName = aux.beerName;
			this.rfid = aux.rfid;
		} else {
			this.beerId = 0;
			this.beerName = '';
			this.rfid = '';
		}
	}
}
