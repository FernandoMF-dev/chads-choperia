import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { HttpRequestUtil } from '../../../../../utils/http-request.util';
import { BaseStockReportFilter } from '../../../models/base-stock-report.filter';
import { ProductStockReport } from '../models/product-stock.report';

@Injectable({
	providedIn: 'root'
})
export class ProductReportService {
	private readonly apiUrl: string = `${ environment.BASE_API }/report/produto`;

	constructor(private readonly http: HttpClient) {
	}

	public reportProductStockOverTime(filter: Partial<BaseStockReportFilter>): Observable<ProductStockReport[]> {
		const params: HttpParams = HttpRequestUtil.getParamsFromObject(filter);
		return this.http.get<ProductStockReport[]>(`${ this.apiUrl }/stock`, { params: params });
	}
}
