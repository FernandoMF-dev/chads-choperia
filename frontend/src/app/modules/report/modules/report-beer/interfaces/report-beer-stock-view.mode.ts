import { SelectItem } from 'primeng/api';

export type ReportBeerStockViewMode = 'all' | 'day' | 'week' | 'month';

export const REPORT_BEER_STOCK_VIEW_MODE_SELECT: SelectItem<ReportBeerStockViewMode>[] = [
	{ label: 'Todas as alterações', value: 'all' },
	{ label: 'Por dia', value: 'day' },
	{ label: 'Por semana', value: 'week' },
	{ label: 'Por mês', value: 'month' }
];
