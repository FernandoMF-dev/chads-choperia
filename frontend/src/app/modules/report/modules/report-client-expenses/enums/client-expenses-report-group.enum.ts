import { SelectItem } from 'primeng/api';

export class ClientExpensesReportGroupEnum {
	public static readonly ALL = 'ALL';
	public static readonly CLIENT = 'CLIENT';
	public static readonly SELLING_POINT = 'SELLING_POINT';
}

export const CLIENT_EXPENSES_REPORT_GROUP_SELECT: SelectItem<ClientExpensesReportGroupEnum>[] = [
	{ label: 'Tudo', value: ClientExpensesReportGroupEnum.ALL },
	{ label: 'Por Cliente', value: ClientExpensesReportGroupEnum.CLIENT },
	{ label: 'Por Ponto de Venda', value: ClientExpensesReportGroupEnum.SELLING_POINT }
];
