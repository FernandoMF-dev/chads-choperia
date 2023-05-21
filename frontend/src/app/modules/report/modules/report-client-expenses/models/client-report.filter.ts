import { SELLING_POINT_SELECT, SellingPointEnum } from '../../../../../enums/selling-point.enum';
import { BaseReportFilter } from '../../../models/base-report.filter';
import { ClientExpesesReportOrderEnum } from './client-expeses-report-order.enum';

export class ClientReportFilter extends BaseReportFilter {
	sellingPoints: SellingPointEnum[];
	order: ClientExpesesReportOrderEnum;

	constructor() {
		super();
		this.order = ClientExpesesReportOrderEnum.DATE_TIME;
		this.sellingPoints = SELLING_POINT_SELECT.map(element => element.value);
	}
}
