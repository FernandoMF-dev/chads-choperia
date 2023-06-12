import { Component, Input } from '@angular/core';
import { SELLING_POINT_FORMAT, SellingPointEnum } from '../../../../../../enums/selling-point.enum';
import { FormatUtils } from '../../../../../../utils/format.utils';
import { ClientExpensesReport } from '../../models/client-expenses.report';

@Component({
	selector: 'app-report-client-expenses-group-all',
	templateUrl: './report-client-expenses-group-all.component.html',
	styleUrls: ['./report-client-expenses-group-all.component.scss']
})
export class ReportClientExpensesGroupAllComponent {
	@Input() allReports: ClientExpensesReport[] = [];
	@Input() totalExpenses: number | undefined;

	formatTelephone(telephone: string): string {
		return FormatUtils.formatTelephone(telephone);
	}

	formatSellingPoint(sellingPoint: SellingPointEnum): string {
		return SELLING_POINT_FORMAT.get(sellingPoint)!;
	}
}
