import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { FoodWeighingModel } from '../models/food-weighing.model';
import { SelfserviceSettings } from '../models/selfservice-settings';

@Injectable({
	providedIn: 'root'
})
export class SelfserviceService {
	private readonly apiUrl: string = `${ environment.BASE_API }/self-service`;

	constructor(private readonly http: HttpClient) {
	}

	public createPurchase(resource: FoodWeighingModel): Observable<FoodWeighingModel> {
		return this.http.post<FoodWeighingModel>(`${ this.apiUrl }/purchase`, resource);
	}

	public changeSettings(resource: SelfserviceSettings): Observable<void> {
		return this.http.put<void>(`${ this.apiUrl }/settings`, resource);
	}

	public getCurrentSetting(): Observable<SelfserviceSettings> {
		return this.http.get<FoodWeighingModel>(`${ this.apiUrl }/settings`);
	}
}
