import { SelectItem } from 'primeng/api';

export class ClientExpensesReportOrderEnum {
	public static readonly DATE_TIME = 'DATE_TIME';
	public static readonly VALUE = 'VALUE';
	public static readonly SELLING_POINT = 'SELLING_POINT';
	public static readonly CLIENT = 'CLIENT';
}

export const CLIENT_EXPESES_REPORT_ORDER_SELECT: SelectItem<ClientExpensesReportOrderEnum>[] = [
	{ label: 'Data & Hora', value: ClientExpensesReportOrderEnum.DATE_TIME },
	{ label: 'Valor', value: ClientExpensesReportOrderEnum.VALUE },
	{ label: 'Ponto de Venda', value: ClientExpensesReportOrderEnum.SELLING_POINT },
	{ label: 'Cliente', value: ClientExpensesReportOrderEnum.CLIENT }
];
