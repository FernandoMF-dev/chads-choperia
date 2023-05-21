import { SELLING_POINT_SELECT, SellingPointEnum } from '../../../../../enums/selling-point.enum';
import { BaseReportFilter } from '../../../models/base-report.filter';
import { ClientExpesesReportGroupEnum } from '../enums/client-expeses-report-group.enum';
import { ClientExpesesReportOrderEnum } from '../enums/client-expeses-report-order.enum';

export class ClientReportFilter extends BaseReportFilter {
	sellingPoints: SellingPointEnum[];
	order: ClientExpesesReportOrderEnum;
	group: ClientExpesesReportGroupEnum;

	constructor() {
		super();
		this.group = ClientExpesesReportGroupEnum.ALL;
		this.order = ClientExpesesReportOrderEnum.DATE_TIME;
		this.sellingPoints = SELLING_POINT_SELECT.map(element => element.value);
	}
}
