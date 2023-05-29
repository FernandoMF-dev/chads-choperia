import { Injectable } from "@angular/core";
import { SalePrintTemplateComponent } from "../modules/card/components/sale-print-template/sale-print-template.component";

@Injectable({
	providedIn: "root",
})
export class PrinterService {
	printClientCardPayment(cardPayment: SalePrintTemplateComponent): void {
		const ticketWindow = window.open("", "PRINT", "height=600,width=600");

		ticketWindow?.document.write("<html><head><title>" + "Chad's Choperia" + "</title>");
		ticketWindow?.document.write(
			'<head><body style="margin: 0; display: grid; font-family:Arial, Helvetica, sans-serif; font-size: 9px"></body></html>'
		);
		ticketWindow?.document.body.appendChild(cardPayment.elementRef.nativeElement);

		setTimeout(() => {
      ticketWindow?.document.close();
      ticketWindow?.focus();
      ticketWindow?.print();
      ticketWindow?.close();
    }, 200);
	}
}
