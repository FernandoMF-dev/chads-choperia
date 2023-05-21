import { SELLING_POINT_SELECT, SellingPointEnum } from '../../../../../enums/selling-point.enum';
import { BaseReportFilter } from '../../../models/base-report.filter';
import { RevenueExpenseTypeEnum } from '../enums/revenue-expense-type.enum';

export class RevenueExpenseReportFilter extends BaseReportFilter {
	type: RevenueExpenseTypeEnum | null;
	sellingPoints: SellingPointEnum[];

	constructor() {
		super();
		this.type = null;
		this.sellingPoints = SELLING_POINT_SELECT.map(element => element.value);
	}
}

export class ClientExpesesReportOrderEnum {
}
