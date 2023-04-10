import { Client } from '../../client/models/client.model';
import { ClientCardStatusEnum } from '../enums/client-card-status.enum';
import { PaymentMethodEnum } from '../enums/payment-method.enum';
import { ClientCardExpense } from './client-card-expense.model';

export class ClientCard {
	public id?: number;
	public client?: Client;
	public rfid?: string;
	public payment?: number;
	public paymentMethod?: PaymentMethodEnum;
	public checkIn?: Date;
	public checkOut?: Date;
	public status?: ClientCardStatusEnum;
	public expenses?: ClientCardExpense[];

	public totalExpenses?: number;
	public change?: number;
}

export class ClientCardLink {
	public rfid?: string;
	public payment?: number;
	public paymentMethod?: PaymentMethodEnum;
}

export class ClientCardPayment {
	public rfid?: string;
	public idClient?: number;
}
