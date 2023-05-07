import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';


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
	ToastModule
  ]
})
export class EmailModule { }
