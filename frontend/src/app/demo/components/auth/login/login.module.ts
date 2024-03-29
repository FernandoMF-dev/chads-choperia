import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';

import { UserService } from '../../../../modules/user/services/user.service';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
	imports: [
		CommonModule,
		LoginRoutingModule,
		ButtonModule,
		CheckboxModule,
		InputTextModule,
		FormsModule,
		PasswordModule,
		RippleModule
	],
	declarations: [LoginComponent],
	providers: [UserService]
})
export class LoginModule {
}
