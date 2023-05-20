import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { HttpRequestUtil } from '../../../../../utils/http-request.util';
import { BaseRevenueExpenseReportFilter } from '../../../models/base-revenue-expense-report.filter';
import { RevenueExpenseReport } from '../models/revenue-expense.report';

@Injectable({
	providedIn: 'root'
})
export class RevenueExpenseReportService {
	private readonly apiUrl: string = `${ environment.BASE_API }/report/receita-despesa`;

	constructor(private readonly http: HttpClient) {
	}

	public reportRevenueExpenseOverTime(filter: Partial<BaseRevenueExpenseReportFilter>): Observable<RevenueExpenseReport[]> {
		const params: HttpParams = HttpRequestUtil.getParamsFromObject(filter);
		return this.http.get<RevenueExpenseReport[]>(`${ this.apiUrl }`, { params: params });
	}
}
