import { Component, Input } from '@angular/core';
import { SELLING_POINT_FORMAT, SellingPointEnum } from '../../../../../../enums/selling-point.enum';
import { FormatUtils } from '../../../../../../utils/format.utils';
import { ClientExpensesReportGroup } from '../../models/client-expenses.report';

@Component({
	selector: 'app-report-client-expenses-group-client',
	templateUrl: './report-client-expenses-group-client.component.html',
	styleUrls: ['./report-client-expenses-group-client.component.scss']
})
export class ReportClientExpensesGroupClientComponent {
	@Input() reportGroups: ClientExpensesReportGroup[] = [];

	formatTelephone(telephone: string): string {
		return FormatUtils.formatTelephone(telephone);
	}

	formatSellingPoint(sellingPoint: SellingPointEnum): string {
		return SELLING_POINT_FORMAT.get(sellingPoint)!;
	}
}
