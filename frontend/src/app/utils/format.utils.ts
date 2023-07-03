export class FormatUtils {
	public static formatTelephone(telephone: string | number): string {
		const tel = telephone.toString();
		return `(${ tel.substring(0, 2) }) ${ tel.substring(2, 7) }-${ tel.substring(7) }`;
	}

	public static formatCurrency(value: number): string {
		return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
	}
}
