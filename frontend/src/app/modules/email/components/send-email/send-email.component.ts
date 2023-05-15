import { Component, OnInit } from '@angular/core';
import { EmailData } from '../../models/send-email.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit{

	emailData: EmailData = new EmailData();

	formGroup!: FormGroup;

	constructor(private formBuilder: FormBuilder,
				private emailService: EmailService,
				private utilsService: UtilsService) {}

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
		this.formGroup.get('periodStartDate')?.setValue(this.convertToDate(this.formGroup.get('periodStartDate')?.value));
		this.formGroup.get('periodEndDate')?.setValue(this.convertToDate(this.formGroup.get('periodEndDate')?.value));
		this.sendEmail(this.formGroup.value);
	}

	convertToDate(date: any): Date {
		let dateString: string = date.toString();
		let parts: string[] = dateString.split('/');
		let day: number = parseInt(parts[0]);
		let month: number = parseInt(parts[1]) - 1;
		let year: number = parseInt(parts[2]);

		return new Date(year, month, day);
	}

	isDataValid(date: any): boolean {
		let dateString: string = date.toString();
		let parts: string[] = dateString.split('/');
		let day: number = parseInt(parts[0]);
		let month: number = parseInt(parts[1]) - 1;
		let year: number = parseInt(parts[2]);

		let dateToValidate: Date = new Date(year, month, day);
		return dateToValidate.getFullYear() === year && dateToValidate.getMonth() === month && dateToValidate.getDate() === day;
	}
	
	validateStartDate(): void {
		let startDate = this.formGroup.get('periodStartDate')?.value;
		if(!this.isDataValid(startDate) && !this.isDateFieldEmpty(startDate)) {
			this.utilsService.showErrorMessage('Data inválida');
			this.formGroup.get('periodStartDate')?.reset();
		}
	}

	validateEndDate(): void {
		let endDate = this.formGroup.get('periodEndDate')?.value;
		if(!this.isDataValid(endDate) && !this.isDateFieldEmpty(endDate)) {
			this.utilsService.showErrorMessage('Data inválida');
			this.formGroup.get('periodEndDate')?.reset();
			return;
		}

		let periodStartDate = this.convertToDate(this.formGroup.get('periodStartDate')?.value);
		let periodEndDate = this.convertToDate(this.formGroup.get('periodEndDate')?.value);
		if(periodEndDate < periodStartDate) {
			this.utilsService.showErrorMessage('Data de fim não deve ser menor que a data de início');
			this.formGroup.get('periodEndDate')?.reset();
		}
	}

	isDateFieldEmpty(field: string) : boolean {
		return field == 'dd/mm/yyyy';
	}

	resetDates(): void {
		this.formGroup.get('periodStartDate')?.reset();
		this.formGroup.get('periodEndDate')?.reset();
	}

	sendEmail(emailData: EmailData) : void {
		console.log(emailData);
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
