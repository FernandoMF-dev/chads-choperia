import { BaseReportFilter } from './base-report.filter';

export class BaseStockReportFilter extends BaseReportFilter {
	targets: number[] = [];

	constructor() {
		super();
	}
}
