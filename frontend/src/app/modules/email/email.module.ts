import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SendEmailComponent } from './components/send-email/send-email.component';

import { EmailRoutingModule } from './email-routing.module';


@NgModule({
	declarations: [
		SendEmailComponent
	],
	imports: [
		CommonModule,
		EmailRoutingModule,
		FormsModule,
		InputMaskModule,
		ButtonModule,
		InputTextareaModule,
		InputTextModule,
		ReactiveFormsModule,
		ToastModule,
		RippleModule,
		CalendarModule
	]
})
export class EmailModule { }
