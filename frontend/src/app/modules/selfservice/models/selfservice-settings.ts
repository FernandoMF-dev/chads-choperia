export class SelfserviceSettings {
	id?: number;
	pricePerKg?: number;
	priceBase?: number;
	dateTime?: number;


	constructor(pricePerKg: number, priceBase: number) {
		this.pricePerKg = pricePerKg;
		this.priceBase = priceBase;
	}
}
