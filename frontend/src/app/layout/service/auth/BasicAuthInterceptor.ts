import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActiveUserService } from './ActiveUserService';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
	constructor(
		// private authenticationService: AuthenticationService
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const user = ActiveUserService.getInstance().getUser();
		const basicAuthHeader = 'Basic ' + btoa(`${user?.username}:${user?.password}`);


		request = request.clone({
			setHeaders: {
				Authorization: basicAuthHeader,
				'Referrer-Policy': "unsafe-url"
			}
		});

		return next.handle(request);
	}
}
