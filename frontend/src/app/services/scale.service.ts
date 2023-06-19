import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface WeightResponse {
	lastWeight: number;
}

@Injectable({
	providedIn: 'root'
})
export class ScaleService {
	constructor(protected readonly http: HttpClient,) {}

	getWeight(): Observable<WeightResponse> {
    return this.http.get<WeightResponse>('http://192.168.47.125/peso');
  }
}
