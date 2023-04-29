import { RestockNotificationStatusEnum } from '../enums/restock-notification-status.enum';

export class RestockNotification {
	constructor(
		public id: number,
		public replaceItemMessage: string,
		public openDate: Date,
		public closeDate: Date | null,
		public status: RestockNotificationStatusEnum
	) {
	}
}
