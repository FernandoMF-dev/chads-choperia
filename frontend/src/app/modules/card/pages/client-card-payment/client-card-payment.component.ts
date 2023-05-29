import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { finalize } from "rxjs/operators";
import { UtilsService } from "../../../../services/utils.service";
import { FormatUtils } from "../../../../utils/format.utils";
import { PaymentMethod } from "../../enums/payment-method.enum";
import { ClientCard, ClientCardPayment } from "../../models/client-card.model";
import { ClientCardService } from "../../services/client-card.service";
import { PrinterService } from "src/app/services/printer.service";
import { CardPayment } from "../../models/card-payment.model";
import { SalePrintTemplateComponent } from "../../components/sale-print-template/sale-print-template.component";

@Component({
	selector: "app-client-card-payment",
	templateUrl: "./client-card-payment.component.html",
	styleUrls: ["./client-card-payment.component.scss"],
})
export class ClientCardPaymentComponent {
	form: FormGroup;
	clientCard?: ClientCard;
	cardPayment?: CardPayment;
	paymentMethods = [{ key: null, description: "Selecione um..." }, ...PaymentMethod.allValues];

	isLoadingSubmit: boolean = false;
	isLoadingRfid: boolean = false;
	
	@ViewChild('saleTicket') saleTicket?: SalePrintTemplateComponent;

	constructor(
		private formBuilder: FormBuilder,
		private clientCardService: ClientCardService,
		private utilsService: UtilsService,
		private printService: PrinterService
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
		this.clientCardService
			.completePayment(payment)
			.pipe(finalize(() => (this.isLoadingSubmit = false)))
			.subscribe({
				next: (res) => {
					this.utilsService.showSuccessMessage(
						`Compra do cartão ${res.rfid} em nome de "${this.getClientName()}" fechada com sucesso.`
					);
					this.printPayment();
					this.resetForm();
				},
				error: (err) => this.utilsService.showErrorMessage(err.error.detail),
			});
	}

	printPayment(): void {
		this.cardPayment = {
			clientCard: this.clientCard,
			paymentMethod: this.form.get("paymentMethod")?.value,
			totalPaid: this.form.get("payment")?.value,
		};
		this.printService.printClientCardPayment(this.saleTicket!);
	}

	isFieldValid(fieldName: string): boolean {
		return this.utilsService.isFieldValid(this.form, fieldName);
	}

	getChange(): number | null {
		if (this.clientCard == null || this.clientCard!.totalExpenses == null || this.form.get("payment")?.value == null) {
			return null;
		}
		return this.form.get("payment")?.value - this.clientCard!.totalExpenses!;
	}

	getClientName(): string | null {
		if (!this.clientCard || !this.clientCard.client) {
			return null;
		}

		return `${this.clientCard.client.name} - ${FormatUtils.formatTelephone(this.clientCard.client.telephone)}`;
	}

	findCardByRfid(): void {
		this.isLoadingRfid = true;
		const rfid: string = this.form.get("rfid")?.value;
		this.clientCardService
			.findOpenByRfid(rfid)
			.pipe(finalize(() => (this.isLoadingRfid = false)))
			.subscribe({
				next: (res) => this.resetForm(res),
				error: (err) => {
					this.utilsService.showErrorMessage(err.error.detail);
					this.resetForm();
				},
			});
	}

	resetForm(card?: ClientCard): void {
		if (card != null) {
			this.form.reset(card);
			this.clientCard = card;
			this.form.get("payment")?.setValidators([Validators.required, Validators.min(this.clientCard.totalExpenses!)]);
			this.form.get("payment")?.enable();
			this.form.get("paymentMethod")?.enable();
		} else {
			this.form.reset();
			this.clientCard = undefined;
			this.form.get("payment")?.setValidators([Validators.required, Validators.min(0)]);
			this.form.get("payment")?.disable();
			this.form.get("paymentMethod")?.disable();
		}
	}

	private initializeForm(): FormGroup {
		return this.formBuilder.group({
			rfid: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
			payment: [null, [Validators.required, Validators.min(0)]],
			paymentMethod: ["", [Validators.required]],
		});
	}
}
