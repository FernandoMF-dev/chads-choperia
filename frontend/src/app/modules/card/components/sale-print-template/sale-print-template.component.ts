import { Component, ElementRef, Input } from '@angular/core';
import { PaymentMethod } from '../../enums/payment-method.enum';
import { CardPayment } from '../../models/card-payment.model';

@Component({
	selector: 'app-sale-print-template',
	templateUrl: './sale-print-template.component.html',
	styleUrls: []
})
export class SalePrintTemplateComponent {
	@Input() cardPayment?: CardPayment;
	date = new Date();
	elementRef: ElementRef;

	constructor(element: ElementRef) {
		this.elementRef = element;
	}

	formatPaymentMethod(): string {
		const paymentMethod: PaymentMethod | undefined = PaymentMethod.find(this.cardPayment?.paymentMethod!);

		if (paymentMethod == null) {
			return '';
		}
		return paymentMethod!.description;
	}
}
