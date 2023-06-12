import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EmailData } from '../models/send-email.model';

@Injectable({
	providedIn: 'root'
})
export class EmailService {

	constructor(private http: HttpClient) {
	}

	private url: string = environment.BASE_API + '/email';

	sendEmail(emailData: EmailData): Observable<void> {
		return this.http.post<void>(`${ this.url }`, emailData);
	}

}
