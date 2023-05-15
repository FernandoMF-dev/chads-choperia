import { BaseReport } from '../../../models/base.report';

export class RevenueExpenseReportModel extends BaseReport {
	constructor(
		description: string,
		value: number,
		dateTime: Date,
		public type: 'REVENUE' | 'EXPENSE'
	) {
		super(description, value, dateTime);
	}
}
