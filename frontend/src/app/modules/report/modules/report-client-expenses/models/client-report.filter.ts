import { SELLING_POINT_SELECT, SellingPointEnum } from '../../../../../enums/selling-point.enum';
import { BaseReportFilter } from '../../../models/base-report.filter';

export class ClientReportFilter extends BaseReportFilter {
	sellingPoints: SellingPointEnum[];

	constructor() {
		super();
		this.sellingPoints = SELLING_POINT_SELECT.map(element => element.value);
	}
}
