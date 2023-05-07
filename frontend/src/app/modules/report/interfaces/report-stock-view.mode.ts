import { SelectItem } from 'primeng/api';

export type ReportStockViewMode = 'all' | 'day' | 'week' | 'month' | 'year';

export const REPORT_STOCK_VIEW_MODE_SELECT: SelectItem<ReportStockViewMode>[] = [
	{ label: 'Todas as movimentações', value: 'all' },
	{ label: 'Por dia', value: 'day' },
	{ label: 'Por semana', value: 'week' },
	{ label: 'Por mês', value: 'month' },
	{ label: 'Por ano', value: 'year' }
];

export const REPORT_STOCK_VIEW_MODE_DATE_FORMAT = new Map<ReportStockViewMode, string>([
	['all', 'dd/MM/yyyy HH:mm:ss'],
	['day', 'dd/MM/yyyy'],
	['week', '0W - MM/yyyy (ww - yyyy)'],
	['month', 'MM/yyyy'],
	['year', 'yyyy']
]);
