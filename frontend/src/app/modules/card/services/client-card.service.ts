import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ClientCard, ClientCardLink, ClientCardPayment } from '../models/client-card.model';

@Injectable({
	providedIn: 'root'
})
export class ClientCardService {
	private readonly apiUrl: string = `${ environment.BASE_API }/card/client`;

	constructor(private readonly http: HttpClient) {
	}

	public findOpenByRfid(rfid: string, paid?: boolean): Observable<ClientCard> {
		return this.http.get<ClientCard>(`${ this.apiUrl }/rfid/${ rfid }`, { params: { paid: !!paid } });
	}

	public linkCardToCustomer(link: ClientCardLink): Observable<ClientCard> {
		return this.http.post<ClientCard>(`${ this.apiUrl }`, link);
	}

	public completePayment(payment: ClientCardPayment): Observable<ClientCard> {
		return this.http.patch<ClientCard>(`${ this.apiUrl }/pagamento`, payment);
	}

	public unlinkCardFromCustomer(rfid: string): Observable<void> {
		return this.http.delete<void>(`${ this.apiUrl }/rfid/${ rfid }`);
	}
}
