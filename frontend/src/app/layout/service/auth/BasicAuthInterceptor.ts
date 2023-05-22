import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveUserService } from './ActiveUserService';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const user = ActiveUserService.getInstance().getUser();
		const basicAuthHeader = 'Basic ' + btoa(`${ user?.username }:${ user?.password }`);
		if (!!user?.username) {
			request = request.clone({
				setHeaders: {
					Authorization: basicAuthHeader,
					'Referrer-Policy': 'unsafe-url'
				}
			});
		}

		return next.handle(request);
	}
}
