import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../../../services/crud.service';
import { Beer } from '../models/beer.model';
import { ManageStockBeer } from '../models/manage-stock-beer.model';

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

	public getAllComplete(): Observable<any[]> {
		return this.http.get<any[]>(this.apiUrl + '/complete');
	}
}
