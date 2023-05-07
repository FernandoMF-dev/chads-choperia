import { HistoricActionEnum } from '../../../enums/historic-action.enum';
import { BaseProductStockReportGroup, BaseStockReport } from '../../../models/base-stock.report';

export class ProductStockReport extends BaseStockReport {
	constructor(
		public barcode: number,
		action: HistoricActionEnum,
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

export class ProductStockReportGroup extends BaseProductStockReportGroup<ProductStockReport> {
	public readonly barcode: number;

	constructor(reports: ProductStockReport[]) {
		super(reports);

		if (reports.length > 0) {
			this.barcode = reports[0].barcode;
		} else {
			this.barcode = 0;
		}
	}
}
