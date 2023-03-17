import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RestockNotification } from '../../user/models/restock-notification.model';

@Injectable({
	providedIn: 'root'
})
export class RestockNotificationService {
	private readonly apiUrl: string = `${ environment.BASE_API }/self-service/restock-notification`;

	constructor(private readonly http: HttpClient) {
	}

	public create(resource: string): Observable<RestockNotification> {
		return this.http.post<RestockNotification>(`${ this.apiUrl }`, resource);
	}

	public findAll(): Observable<RestockNotification[]> {
		return this.http.get<RestockNotification[]>(`${ this.apiUrl }`);
	}

	public replaceStock(notificationId: number): Observable<void> {
		return this.http.patch<void>(`${ this.apiUrl }/replace-stock/${ notificationId }`, null);
	}
}
