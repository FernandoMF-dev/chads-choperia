import { PaymentMethodEnum } from "../enums/payment-method.enum";
import { ClientCard } from "./client-card.model";

export class CardPayment {
	public clientCard?: ClientCard;
	public paymentMethod?: PaymentMethodEnum;
	public totalPaid?: number;
}