import { SelectItem } from 'primeng/api';

export class SellingPointEnum {
	public static readonly BEER = 'BEER';
	public static readonly SELF_SERVICE = 'SELF_SERVICE';
	public static readonly KITCHEN_PRODUCT = 'KITCHEN_PRODUCT';
	public static readonly MISCELLANEA = 'MISCELLANEA';
}

export const SELLING_POINT_FORMAT: Map<SellingPointEnum, string> = new Map([
	[SellingPointEnum.BEER, 'Chopes'],
	[SellingPointEnum.SELF_SERVICE, 'Self-Service'],
	[SellingPointEnum.KITCHEN_PRODUCT, 'Produtos de Cozinha'],
	[SellingPointEnum.MISCELLANEA, 'Miscelânea']
]);

export const SELLING_POINT_SELECT: SelectItem<SellingPointEnum>[] = [
	{ label: SELLING_POINT_FORMAT.get(SellingPointEnum.BEER), value: SellingPointEnum.BEER },
	{ label: SELLING_POINT_FORMAT.get(SellingPointEnum.SELF_SERVICE), value: SellingPointEnum.SELF_SERVICE },
	{ label: SELLING_POINT_FORMAT.get(SellingPointEnum.KITCHEN_PRODUCT), value: SellingPointEnum.KITCHEN_PRODUCT },
	{ label: SELLING_POINT_FORMAT.get(SellingPointEnum.MISCELLANEA), value: SellingPointEnum.MISCELLANEA }
];
