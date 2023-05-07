import { HistoricActionEnum } from '../enums/historic-action.enum';
import { BaseReport } from './base.report';

export abstract class BaseStockReport extends BaseReport {

	protected constructor(
		public action: HistoricActionEnum,
		public productId: number,
		public productName: string,
		description: string,
		value: number,
		dateTime: Date,
		public totalStock: number
	) {
		super(description, value, dateTime);
	}
}

export abstract class BaseStockReportGroup<T extends BaseStockReport> {
	public readonly productId: number;
	public readonly productName: string;

	protected constructor(
		public readonly reports: T[]
	) {
		if (reports.length > 0) {
			const aux = reports[0];
			this.productId = aux.productId;
			this.productName = aux.productName;
		} else {
			this.productId = 0;
			this.productName = '';
		}
	}
}
