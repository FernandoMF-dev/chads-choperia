import { SellingPointEnum } from '../../../enums/selling-point.enum';

export class ClientCardExpense {
	public id?: number;
	public idCard?: number;
	public value?: number;
	public description?: string;
	public dateTime?: Date;
	public sellingPoint?: SellingPointEnum;
}
