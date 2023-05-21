import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { EmailData } from '../../models/send-email.model';
import { EmailService } from '../../services/email.service';

@Component({
	selector: 'app-send-email',
	templateUrl: './send-email.component.html',
	styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

	emailData: EmailData = new EmailData();

	formGroup!: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private emailService: EmailService,
		private utilsService: UtilsService
	) {
	}

	ngOnInit(): void {
		this.buildFormGroup();
	}

	buildFormGroup(): void {
		this.formGroup = this.formBuilder.group({
			subject: [null, [Validators.required]],
			message: [null, [Validators.required]],
			periodStartDate: [null, [Validators.required]],
			periodEndDate: [null, [Validators.required]]
		});
	}

	send(): void {
		this.sendEmail(this.formGroup.value);
	}

	validateEndDate(): void {
		if (this.formGroup.get('periodEndDate')?.value < this.formGroup.get('periodStartDate')?.value) {
			this.utilsService.showErrorMessage('Data de fim não deve ser menor que a data de início');
			this.formGroup.get('periodEndDate')?.reset();
		}
	}

	resetDates(): void {
		this.formGroup.get('periodStartDate')?.reset();
		this.formGroup.get('periodEndDate')?.reset();
	}

	isFieldValid(fieldName: string): boolean {
		return this.utilsService.isFieldValid(this.formGroup, fieldName);
	}

	sendEmail(emailData: EmailData): void {
		this.emailService.sendEmail(emailData).subscribe({
			next: () => {
				this.utilsService.showSuccessMessage('E-mail enviado com sucesso');
				this.formGroup.reset();
			},
			error: (error) => {
				this.utilsService.showErrorMessage(error.error.detail);
				this.resetDates();
			}
		});
	}

	disableSendButton(): boolean {
		return !this.formGroup.valid;
	}

}
