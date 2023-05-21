import { SelectItem } from 'primeng/api';

export class RevenueExpenseTypeEnum {
	public static readonly REVENUE = 'REVENUE';
	public static readonly EXPENSE = 'EXPENSE';
}

export const REVENUE_EXPENSE_TYPE_OPTIONS: SelectItem<RevenueExpenseTypeEnum | null>[] = [
	{ label: 'Todas Movimentações', value: null },
	{ label: 'Receitas', value: RevenueExpenseTypeEnum.REVENUE },
	{ label: 'Despesas', value: RevenueExpenseTypeEnum.EXPENSE }
];
