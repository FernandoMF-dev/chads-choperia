import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { FormatUtils } from '../../../../utils/format.utils';
import { PaymentMethod } from '../../enums/payment-method.enum';
import { ClientCard, ClientCardPayment } from '../../models/client-card.model';
import { ClientCardService } from '../../services/client-card.service';

@Component({
	selector: 'app-client-card-checkout',
	templateUrl: './client-card-checkout.component.html',
	styleUrls: ['./client-card-checkout.component.scss']
})
export class ClientCardCheckoutComponent {
	private static readonly RFID_INPUT_TIMER: number = 500;

	form: FormGroup;
	clientCard?: ClientCard;
	paymentMethods = [{ key: null, description: 'Selecione um...' }, ...PaymentMethod.allValues];

	isLoadingSubmit: boolean = false;
	isLoadingRfid: boolean = false;
	isTypingRfid: boolean = false;
	private rfidInputTimer: any;

	constructor(
		private formBuilder: FormBuilder,
		private clientCardService: ClientCardService,
		private utilsService: UtilsService
	) {
		this.form = this.initializeForm();
		this.resetForm();
	}

	get isLoading(): boolean {
		return this.isLoadingSubmit || this.isLoadingRfid;
	}

	onSubmit(): void {
		if (this.isLoading || !this.form.valid || this.clientCard == null) {
			return;
		}

		this.isLoadingSubmit = true;
		const payment: ClientCardPayment = Object.assign(new ClientCardPayment(), this.form.value);
		this.clientCardService.completePayment(payment)
			.pipe(finalize(() => this.isLoadingSubmit = false))
			.subscribe({
				next: (res) => {
					this.utilsService.showSuccessMessage(`Compra do cartão ${ res.rfid } em nome de "${ res.client!.name }" fechada com sucesso.`);
					this.resetForm();
				},
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	onRfidInput(event: any): void {
		this.isTypingRfid = true;
		clearTimeout(this.rfidInputTimer);
		this.rfidInputTimer = setTimeout(() => {
			this.isTypingRfid = false;
			this.findCardByRfid(event.value);
		}, ClientCardCheckoutComponent.RFID_INPUT_TIMER);
	}

	isFieldValid(fieldName: string): boolean {
		return this.utilsService.isFieldValid(this.form, fieldName);
	}

	getChange(): number | null {
		if (this.clientCard == null || this.clientCard!.totalExpenses == null || this.form.get('payment')?.value == null) {
			return null;
		}
		return this.form.get('payment')?.value - this.clientCard!.totalExpenses!;
	}

	getClientName(): string | null {
		if (!this.clientCard || !this.clientCard.client) {
			return null;
		}

		return `${ this.clientCard.client.name } - ${ FormatUtils.formatTelephone(this.clientCard.client.telephone) }`;
	}

	resetForm(card?: ClientCard): void {
		if (card != null) {
			this.form.reset(card);
			this.clientCard = card;
			this.form.get('payment')?.setValidators([Validators.required, Validators.min(this.clientCard.totalExpenses!)]);
			this.form.get('payment')?.enable();
			this.form.get('paymentMethod')?.enable();
		} else {
			this.form.reset();
			this.clientCard = undefined;
			this.form.get('payment')?.setValidators([Validators.required, Validators.min(0)]);
			this.form.get('payment')?.disable();
			this.form.get('paymentMethod')?.disable();
		}

	}

	private initializeForm(): FormGroup {
		return this.formBuilder.group({
			'rfid': [null, [Validators.required, Validators.min(1)]],
			'payment': [null, [Validators.required, Validators.min(0)]],
			'paymentMethod': ['', [Validators.required]]
		});
	}

	private findCardByRfid(rfid: number = this.form.get('payment')?.value): void {
		this.isLoadingRfid = true;
		this.clientCardService.findOpenByRfid(rfid)
			.pipe(finalize(() => this.isLoadingRfid = false))
			.subscribe({
				next: (res) => this.resetForm(res),
				error: (err) => {
					this.utilsService.showErrorMessage(err.error.detail);
					this.resetForm();
				}
			});
	}
}
