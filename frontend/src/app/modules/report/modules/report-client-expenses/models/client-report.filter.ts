import { SELLING_POINT_SELECT, SellingPointEnum } from '../../../../../enums/selling-point.enum';
import { BaseReportFilter } from '../../../models/base-report.filter';
import { ClientExpensesReportGroupEnum } from '../enums/client-expenses-report-group.enum';
import { ClientExpensesReportOrderEnum } from '../enums/client-expenses-report-order.enum';

export class ClientReportFilter extends BaseReportFilter {
	sellingPoints: SellingPointEnum[];
	order: ClientExpensesReportOrderEnum;
	group: ClientExpensesReportGroupEnum;

	constructor() {
		super();
		this.group = ClientExpensesReportGroupEnum.ALL;
		this.order = ClientExpensesReportOrderEnum.DATE_TIME;
		this.sellingPoints = SELLING_POINT_SELECT.map(element => element.value);
	}
}
