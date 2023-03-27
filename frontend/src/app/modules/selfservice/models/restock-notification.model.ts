export class RestockNotification {
	constructor(
		public id: number,
		public replaceItemMessage: string,
		public notificationDate: Date,
		public restockedItem: boolean
	) {
	}
}
