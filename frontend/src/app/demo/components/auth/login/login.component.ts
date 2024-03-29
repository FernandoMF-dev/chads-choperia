import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveUserService } from '../../../../layout/service/auth/ActiveUserService';
import { User } from '../../../../modules/user/models/user.model';
import { UserService } from '../../../../modules/user/services/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {

	valCheck: string[] = ['remember'];

	user: User = {};

	constructor(
		private service: UserService,
		private router: Router
	) {
	}

	login() {
		if (!!this.user) {
			this.service.login(this.user).subscribe(res => {
				this.user.roleNames = res['authorities'].map((role: { roleName: any; }) => {
					return role.roleName;
				});
				ActiveUserService.getInstance().setUser(this.user);
				this.router.navigate(['/']);
			});
		}
	}
}
