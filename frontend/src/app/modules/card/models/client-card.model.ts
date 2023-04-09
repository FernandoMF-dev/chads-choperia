import { Client } from '../../client/models/client.model';
import { ClientCardStatusEnum } from '../enums/client-card-status.enum';
import { ClientCardExpense } from './client-card-expense.model';

export class ClientCard {
	public id?: number;
	public client?: Client;
	public rfid?: number;
	public payment?: number;
	public paymentMethod?: string;
	public checkIn?: Date;
	public checkOut?: Date;
	public status?: ClientCardStatusEnum;
	public expenses?: ClientCardExpense[];
}

export class ClientCardLink {
	public rfid?: number;
	public payment?: number;
	public paymentMethod?: string;
}

export class ClientCardPayment {
	public rfid?: number;
	public idClient?: number;
}
