import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
	constructor(
		// private authenticationService: AuthenticationService
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const username = 'ADMINISTRADOR';
		const password = 'senha123';
		const basicAuthHeader = 'Basic ' + btoa(`${username}:${password}`);


		request = request.clone({
			setHeaders: {
				Authorization: basicAuthHeader,
				'Referrer-Policy': "unsafe-url"
			}
		});

		return next.handle(request);
	}
}
