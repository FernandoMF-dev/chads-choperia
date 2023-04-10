export class Client {
	id?: number;

	currentCardRfid?: string;

	constructor(
		public name: string,
		public telephone: string,
		public email: string,
		public cpf?: string
	) {
	}
}
