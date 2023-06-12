import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActiveUserService } from './ActiveUserService';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router,
		private messageService: MessageService
	) {
	}

	activeUserService: ActiveUserService = ActiveUserService.getInstance();


	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const errorMessage: any = { severity: 'error', summary: 'Erro', detail: 'Você não pode acessar essa rota', life: 3000 };
		if (this.activeUserService.isLogged()) {
			const routeRoles: string[] = route.data['roles'];
			if (!routeRoles || routeRoles.some(item => this.activeUserService.getUser()?.roleNames?.includes(item))) {
				return true;
			}
			this.messageService.add(errorMessage);
			return false;
		}
		this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
		return false;
	}
}
