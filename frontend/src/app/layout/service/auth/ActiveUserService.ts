import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../../../modules/user/models/user.model';

const USER = 'user';

@Injectable({ providedIn: 'root' })
export class ActiveUserService {
	private static instance: ActiveUserService;

	private constructor() {
	}

	private get activeUser(): User {
		const user = localStorage.getItem(USER);
		if (!!user) {
			const User: User = JSON.parse(user) as User;
			return User;
		}
		return {};
	}

	private set activeUser(activeUser: User) {
		localStorage.setItem(USER, JSON.stringify(activeUser))
	}

	public static getInstance(): ActiveUserService {
		if (!ActiveUserService.instance) {
			ActiveUserService.instance = new ActiveUserService();
		}

		return ActiveUserService.instance;
	}

	public isLogged(): boolean {
		if (!!this.activeUser.username) {
			return true;
		}
		return false;
	}

	public setUser(userLogado: User): void {
		this.activeUser = userLogado;
	}

	public getUser(): User | null {
		return this.activeUser;
	}

	public logout(): void {
		this.setUser({});
		localStorage.removeItem(USER);
	}

}

