import { Component } from '@angular/core';
import { RouteLinkUtils } from '../../../../utils/route-link.utils';

@Component({
	selector: 'app-report-lobby',
	templateUrl: './report-lobby.component.html',
	styleUrls: ['./report-lobby.component.scss']
})
export class ReportLobbyComponent {
	items: ReportLobbyItem[] = [
		{
			label: 'Estoque de Chopes',
			material: 'local_drink',
			routerLink: [RouteLinkUtils.BEER, RouteLinkUtils.STOCK]
		},
		{
			label: 'Consumo de Chope',
			material: 'sports_bar',
			routerLink: [RouteLinkUtils.BEER, RouteLinkUtils.EXIT]
		},
		{
			label: 'Estoque de Produtos',
			material: 'kitchen',
			routerLink: [RouteLinkUtils.PRODUCT, RouteLinkUtils.STOCK]
		},
		{
			label: 'Produtos em Ponto de Encomenda',
			material: 'deployed_code_alert',
			routerLink: [RouteLinkUtils.PRODUCT, RouteLinkUtils.RESTOCK]
		},
		{
			label: 'Receitas e Despesas',
			material: 'Event_note',
			routerLink: [RouteLinkUtils.REVENUE_EXPENSE]
		},
		{
			label: 'Gastos de Clientes',
			material: 'payments',
			routerLink: [RouteLinkUtils.CLIENTE]
		}
	];
}

interface ReportLobbyItem {
	label: string;
	icon?: string;
	material?: string;
	routerLink: string[];
}
