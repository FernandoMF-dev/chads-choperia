import { SelectItem } from 'primeng/api';

export type ReportBeerStockViewMode = 'all' | 'day' | 'week' | 'month' | 'year';

export const REPORT_BEER_STOCK_VIEW_MODE_SELECT: SelectItem<ReportBeerStockViewMode>[] = [
	{ label: 'Todas as alterações', value: 'all' },
	{ label: 'Por dia', value: 'day' },
	{ label: 'Por semana', value: 'week' },
	{ label: 'Por mês', value: 'month' }
];

export const REPORT_BEER_STOCK_VIEW_MODE_DATE_FORMAT = new Map<ReportBeerStockViewMode, string>([
	['all', 'dd/MM/yyyy HH:mm:ss'],
	['day', 'dd/MM/yyyy'],
	['week', 'W-MM/yyyy'],
	['month', 'MM/yyyy'],
	['year', 'yyyy']
]);
