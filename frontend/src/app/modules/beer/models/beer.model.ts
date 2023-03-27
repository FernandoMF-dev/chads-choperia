export class Beer {
	public id?: number;

	constructor(
		public name: string,
		public purchasePrice: number,
		public valuePerMug: number,
		public stock: number
	) {
	}
}
