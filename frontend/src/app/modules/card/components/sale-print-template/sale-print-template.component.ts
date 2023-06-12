import { Component, ElementRef, Input } from "@angular/core";
import { CardPayment } from "../../models/card-payment.model";

@Component({
	selector: "app-sale-print-template",
	templateUrl: "./sale-print-template.component.html",
	styleUrls: [],
})
export class SalePrintTemplateComponent {
	@Input() cardPayment?: CardPayment;
	date = new Date();
	elementRef: ElementRef;

	constructor(element: ElementRef) {
		this.elementRef = element;
	}
}
