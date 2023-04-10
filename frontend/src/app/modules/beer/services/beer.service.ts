import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../../../services/crud.service';
import { Beer } from '../models/beer.model';
import { Pour } from '../models/pour.model';

@Injectable({
	providedIn: 'root'
})
export class BeerService extends CrudService<Beer> {
	constructor(protected override readonly http: HttpClient) {
		super(http, 'chop');
	}

	public getAllComplete(): Observable<any[]> {
		return this.http.get<any[]>(this.apiUrl + '/complete');
	}

	public pourBeer(pour: Pour): Observable<void> {
		return this.http.put<void>(this.apiUrl + '/pour',pour);
	}
}
