export abstract class BaseReport {
	protected constructor(
		public description: string,
		public value: number,
		public dateTime: Date
	) {
	}
}
