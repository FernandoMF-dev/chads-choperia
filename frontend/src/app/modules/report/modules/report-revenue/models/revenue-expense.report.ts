import { SellingPointEnum } from '../../../../../enums/selling-point.enum';
import { RevenueExpenseTypeEnum } from '../../../enums/revenue-expense-type.enum';
import { BaseReport } from '../../../models/base.report';

export class RevenueExpenseReport extends BaseReport {
	constructor(
		public type: RevenueExpenseTypeEnum,
		public sellingPoint: SellingPointEnum,
		description: string,
		value: number,
		dateTime: Date
	) {
		super(description, value, dateTime);
	}
}
