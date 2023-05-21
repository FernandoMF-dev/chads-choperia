import { SellingPointEnum } from '../../../../../enums/selling-point.enum';
import { ClientCardStatusEnum } from '../../../../card/enums/client-card-status.enum';
import { BaseReport } from '../../../models/base.report';

export class ClientExpensesReport extends BaseReport {
	constructor(
		public clientId: number,
		public clientName: string,
		public clientTelephone: string,
		public clientEmail: string,
		public clientCardId: number,
		public clientCardStatus: ClientCardStatusEnum,
		public clientCardrfid: string,
		public sellingPoint: SellingPointEnum,
		description: string,
		value: number,
		dateTime: Date
	) {
		super(description, value, dateTime);
	}
}

export class ClientExpensesReportGroup {
	public value: number = 0;
	public name: string = '';
	public telephone: string = '';
	public email: string = '';

	constructor(
		public reports: ClientExpensesReport[]
	) {
	}
}
