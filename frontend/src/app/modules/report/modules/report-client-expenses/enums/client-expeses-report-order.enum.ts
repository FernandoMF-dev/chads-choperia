import { SelectItem } from 'primeng/api';

export class ClientExpesesReportOrderEnum {
	public static readonly DATE_TIME = 'DATE_TIME';
	public static readonly VALUE = 'VALUE';
	public static readonly SELLING_POINT = 'SELLING_POINT';
	public static readonly CLIENT = 'CLIENT';
}

export const CLIENT_EXPESES_REPORT_ORDER_SELECT: SelectItem<ClientExpesesReportOrderEnum>[] = [
	{ label: 'Data & Hora', value: ClientExpesesReportOrderEnum.DATE_TIME },
	{ label: 'Valor', value: ClientExpesesReportOrderEnum.VALUE },
	{ label: 'Ponto de Venda', value: ClientExpesesReportOrderEnum.SELLING_POINT },
	{ label: 'Cliente', value: ClientExpesesReportOrderEnum.CLIENT }
];
