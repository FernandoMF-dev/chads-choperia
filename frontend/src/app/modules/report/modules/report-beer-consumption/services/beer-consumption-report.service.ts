import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BeerConsumptionReport } from '../models/beer-consumption.report';
import { BeerConsumptionFilter } from '../models/beer-consumption-filter.model';

@Injectable({
  providedIn: 'root'
})
export class BeerConsumptionReportService {

	private readonly apiUrl: string = `${ environment.BASE_API }/report/chope`;

	constructor(private readonly http: HttpClient) {
	}

	getConsumptionReportOverTime(filter: BeerConsumptionFilter): Observable<BeerConsumptionReport[]> {
		return this.http.post<BeerConsumptionReport[]>(`${ this.apiUrl }/consumption`, filter);
	}

}
