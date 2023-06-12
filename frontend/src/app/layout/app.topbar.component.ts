import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { ActiveUserService } from './service/auth/ActiveUserService';

@Component({
	selector: 'app-topbar',
	templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

	items!: MenuItem[];

	@ViewChild('menubutton') menuButton!: ElementRef;

	@ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

	@ViewChild('topbarmenu') menu!: ElementRef;

	constructor(
		private router: Router,
		public layoutService: LayoutService
	) {
	}

	public clearAndLogin() {
		ActiveUserService.getInstance().logout();
		this.router.navigate(['/auth/login']);
	}

	public isLogged() {
		return ActiveUserService.getInstance().isLogged();
	}
}
