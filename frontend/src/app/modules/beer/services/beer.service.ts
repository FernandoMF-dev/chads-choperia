import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../../../services/crud.service';
import { Beer } from '../models/beer.model';
import { ManageStockBeer } from '../models/manage-stock-beer.model';
import { Pour } from '../models/pour.model';

@Injectable({
	providedIn: 'root'
})
export class BeerService extends CrudService<Beer> {

	constructor(protected override readonly http: HttpClient) {
		super(http, 'chop');
	}

	public restockBeers(queries: ManageStockBeer[]): Observable<ManageStockBeer[]> {
		return this.http.post<ManageStockBeer[]>(`${ this.apiUrl }/restock`, queries);
	}

	public getAllComplete(query?: { [key: string]: string }): Observable<Beer[]> {
		const params = new HttpParams({ fromObject: query });
		return this.http.get<Beer[]>(this.apiUrl + '/complete', { params });
	}

	public pourBeer(pour: Pour): Observable<void> {
		return this.http.put<void>(this.apiUrl + '/pour', pour);
	}
}
