import { BaseReport } from './base.report';

export class IncomeAndExpenseReport extends BaseReport {
	constructor(description: string, value: number, dateTime: Date) {
		super(description, value, dateTime);
	}
}
