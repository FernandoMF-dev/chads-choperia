import { RevenueExpenseTypeEnum } from '../enums/revenue-expense-type.enum';
import { BaseReport } from './base.report';

export class RevenueExpenseReport extends BaseReport {
	constructor(
		public type: RevenueExpenseTypeEnum,
		description: string,
		value: number,
		dateTime: Date
	) {
		super(description, value, dateTime);
	}
}
