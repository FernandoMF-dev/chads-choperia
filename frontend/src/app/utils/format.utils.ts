export class FormatUtils {
	public static formatTelephone(telephone: string | number): string {
		const tel = telephone.toString();
		return `(${ tel.substring(0, 2) }) ${ tel.substring(2, 7) }-${ tel.substring(7) }`;
	}
}
