import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ActiveUserService } from './ActiveUserService';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
	) { }

	activeUserService: ActiveUserService = ActiveUserService.getInstance();


	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if(this.activeUserService.isLogged()){
			return true;
		}

		this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
