import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Beer } from '../models/beer.model';
import { Observable } from 'rxjs';
import { ViewBeer } from '../models/view-beer.model';
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

}
