export class BeerStockReportFilter {
	minDate: Date = new Date();
	maxDate: Date = new Date();
	beers: number[] = [];

	constructor() {
		this.maxDate.setDate(this.maxDate.getDate() + 1);
		this.minDate.setMonth(this.minDate.getMonth() - 1);
	}
}
