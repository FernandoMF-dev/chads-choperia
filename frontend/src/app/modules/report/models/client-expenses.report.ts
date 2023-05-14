import { ClientCardStatusEnum } from '../../card/enums/client-card-status.enum';
import { BaseReport } from './base.report';

export class ClientExpensesReport extends BaseReport {
	constructor(
		public clientId: number,
		public clientName: string,
		public clientTelephone: string,
		public clientEmail: string,
		public clientCardId: number,
		public clientCardStatus: ClientCardStatusEnum,
		public clientCardrfid: string,
		description: string,
		value: number,
		dateTime: Date
	) {
		super(description, value, dateTime);
	}
}
