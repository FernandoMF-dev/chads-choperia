import { Beer } from './beer.model';

export class Select {
	public label?: string;
	public value?: number;
	public price?: number;

	constructor(beer: Beer) {
		this.label = beer.name;
		this.value = beer.id;
		this.price = beer.valuePerMug;
	}
}
