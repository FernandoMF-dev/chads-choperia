import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { HttpRequestUtil } from '../../../../../utils/http-request.util';
import { BaseClientReportFilter } from '../../../models/base-client-report.filter';
import { ClientExpensesReport } from '../../../models/client-expenses.report';

@Injectable({
	providedIn: 'root'
})
export class ClientExpensesReportService {
	private readonly apiUrl: string = `${ environment.BASE_API }/report/client`;

	constructor(private readonly http: HttpClient) {
	}

	public reportClientExpenseOverTime(filter: Partial<BaseClientReportFilter>): Observable<ClientExpensesReport[]> {
		const params: HttpParams = HttpRequestUtil.getParamsFromObject(filter);
		return this.http.get<ClientExpensesReport[]>(`${ this.apiUrl }`, { params: params });
	}
}
