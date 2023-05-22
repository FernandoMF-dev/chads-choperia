import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { HttpRequestUtil } from '../../../../../utils/http-request.util';
import { BaseStockReportFilter } from '../../../models/base-stock-report.filter';
import { BeerStockReport } from '../models/beer-stock.report';
import { BeerConsumptionFilter } from '../../report-beer-consumption/models/beer-consumption-filter.model';
import { BeerConsumptionReport } from '../../report-beer-consumption/models/beer-consumption.report';

@Injectable({
	providedIn: 'root'
})
export class BeerReportService {
	private readonly apiUrl: string = `${ environment.BASE_API }/report/chope`;

	constructor(private readonly http: HttpClient) {
	}

	public reportBeerStockOverTime(filter: Partial<BaseStockReportFilter>): Observable<BeerStockReport[]> {
		const params: HttpParams = HttpRequestUtil.getParamsFromObject(filter);
		return this.http.get<BeerStockReport[]>(`${ this.apiUrl }/stock`, { params: params });
	}

	public getConsumptionReportOverTime(filter: Partial<BeerConsumptionFilter>): Observable<BeerConsumptionReport[]> {
		const params: HttpParams = HttpRequestUtil.getParamsFromObject(filter);
		return this.http.get<BeerConsumptionReport[]>(`${ this.apiUrl }/consumption`, { params: params });
	}
	
}
