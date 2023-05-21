import { SelectItem } from 'primeng/api';

export class ClientExpesesReportGroupEnum {
	public static readonly ALL = 'ALL';
	public static readonly CLIENT = 'CLIENT';
	public static readonly SELLING_POINT = 'SELLING_POINT';
}

export const CLIENT_EXPENSES_REPORT_GROUP_SELECT: SelectItem<ClientExpesesReportGroupEnum>[] = [
	{ label: 'Tudo', value: ClientExpesesReportGroupEnum.ALL },
	{ label: 'Por Cliente', value: ClientExpesesReportGroupEnum.CLIENT },
	{ label: 'Por Ponto de Venda', value: ClientExpesesReportGroupEnum.SELLING_POINT }
];
