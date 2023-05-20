import { SelectItem } from 'primeng/api';

export class SellingPointEnum {
	public static readonly BEER = 'BEER';
	public static readonly SELF_SERVICE = 'SELF_SERVICE';
	public static readonly KITCHEN_PRODUCT = 'KITCHEN_PRODUCT';
	public static readonly MISCELLANEA = 'MISCELLANEA';
}

export const SELLING_POINT_FORMAT: Map<SellingPointEnum, string> = new Map([
	[SellingPointEnum.BEER, 'Chope'],
	[SellingPointEnum.SELF_SERVICE, 'Self-Service'],
	[SellingPointEnum.KITCHEN_PRODUCT, 'Produtos de Cozinha'],
	[SellingPointEnum.MISCELLANEA, 'Miscelânea']
]);

export const SELLING_POINT_SELECT: SelectItem<SellingPointEnum>[] = [
	{ label: 'Chope', value: SellingPointEnum.BEER },
	{ label: 'Self-Service', value: SellingPointEnum.SELF_SERVICE },
	{ label: 'Produtos de Cozinha', value: SellingPointEnum.KITCHEN_PRODUCT },
	{ label: 'Miscelânea', value: SellingPointEnum.MISCELLANEA }
];
