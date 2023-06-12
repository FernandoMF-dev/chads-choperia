import { Component, Input } from '@angular/core';
import { FormatUtils } from '../../../../../../utils/format.utils';
import { ClientExpensesReportGroup } from '../../models/client-expenses.report';

@Component({
	selector: 'app-report-client-expenses-group-selling-point',
	templateUrl: './report-client-expenses-group-selling-point.component.html',
	styleUrls: ['./report-client-expenses-group-selling-point.component.scss']
})
export class ReportClientExpensesGroupSellingPointComponent {
	@Input() reportGroups: ClientExpensesReportGroup[] = [];

	formatTelephone(telephone: string): string {
		return FormatUtils.formatTelephone(telephone);
	}
}
