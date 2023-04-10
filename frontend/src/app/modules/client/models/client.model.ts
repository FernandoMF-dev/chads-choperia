export class Client {
	id?: number;

	currentCardRfid?: number;

	constructor(
		public name: string,
		public telephone: string,
		public email: string,
		public cpf?: string
	) {
	}
}
