export class PaymentMethodEnum {
	public static readonly CASH = 'CASH';
	public static readonly CREDIT_CARD = 'CREDIT_CARD';
	public static readonly DEBT_CARD = 'DEBT_CARD';
	public static readonly PIX = 'PIX';
	public static readonly PICPAY = 'PICPAY';
	public static readonly OTHER = 'OTHER';
}

export class PaymentMethod {
	public static readonly CASH = new PaymentMethod(PaymentMethodEnum.CASH, 'Dinheiro');
	public static readonly CREDIT_CARD = new PaymentMethod(PaymentMethodEnum.CREDIT_CARD, 'Cartão - Crédito');
	public static readonly DEBT_CARD = new PaymentMethod(PaymentMethodEnum.DEBT_CARD, 'Cartão - Débito');
	public static readonly PIX = new PaymentMethod(PaymentMethodEnum.PIX, 'PIX');
	public static readonly PICPAY = new PaymentMethod(PaymentMethodEnum.PICPAY, 'PicPay');
	public static readonly OTHER = new PaymentMethod(PaymentMethodEnum.OTHER, 'Outro');

	constructor(
		public key: PaymentMethodEnum,
		public description: string
	) {
	}

	public static get allValues(): PaymentMethod[] {
		return [this.CASH, this.CREDIT_CARD, this.DEBT_CARD, this.PIX, this.PICPAY,
			this.OTHER];
	}

}
