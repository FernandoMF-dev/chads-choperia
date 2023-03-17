import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export class CrudService<T> {
	protected readonly apiUrl = `${ this.baseUrl }/${ this.entityName }`;

	constructor(
		protected readonly http: HttpClient,
		protected readonly entityName: string,
		protected readonly baseUrl: string = environment.BASE_API
	) {
	}

	public create(resource: Partial<T>): Observable<T> {
		return this.http.post<T>(`${ this.apiUrl }`, resource);
	}

	public getAll(query?: { [key: string]: string }): Observable<T[]> {
		const params = new HttpParams({ fromObject: query });
		return this.http.get<T[]>(this.apiUrl, { params });
	}

	public getById(id: number): Observable<T> {
		return this.http.get<T>(`${ this.apiUrl }/${ id }`);
	}

	public update(resource: Partial<T>): Observable<T> {
		return this.http.put<T>(`${ this.apiUrl }`, resource);
	}

	public delete(id: number): Observable<void> {
		return this.http.delete<void>(`${ this.apiUrl }/${ id }`);
	}
}
