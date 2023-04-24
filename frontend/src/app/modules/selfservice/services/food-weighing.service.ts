import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { FoodWeighingModel } from "../models/food-weighing.model";

@Injectable({
	providedIn: "root",
})
export class foodWeighingService {
	private readonly apiUrl: string = `${environment.BASE_API}/self-service`;

	constructor(private readonly http: HttpClient) {}

	public create(resource: string): Observable<FoodWeighingModel> {
		return this.http.post<FoodWeighingModel>(`${this.apiUrl}`, resource);
	}
}
