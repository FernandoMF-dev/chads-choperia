import { RevenueExpenseTypeEnum } from '../modules/report-revenue/enums/revenue-expense-type.enum';

export class BaseRevenueExpenseReportFilter {
	minDate: Date = new Date();
	maxDate: Date = new Date();
	type: RevenueExpenseTypeEnum | null;

	constructor() {
		this.maxDate.setDate(this.maxDate.getDate() + 1);
		this.maxDate.setHours(0, 0, 0, 0);
		this.minDate.setMonth(this.minDate.getMonth() - 1);
		this.minDate.setHours(0, 0, 0, 0);
		this.type = null;
	}
}
