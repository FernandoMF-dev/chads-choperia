export abstract class BaseReportFilter {
	minDate: Date = new Date();
	maxDate: Date = new Date();

	protected constructor() {
		this.maxDate.setDate(this.maxDate.getDate() + 1);
		this.maxDate.setHours(0, 0, 0, 0);
		this.minDate.setMonth(this.minDate.getMonth() - 1);
		this.minDate.setHours(0, 0, 0, 0);
	}
}
