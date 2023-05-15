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
			label: 'Estoque de Cerveja',
			material: 'local_drink',
			routerLink: [RouteLinkUtils.BEER]
		},
		{
			label: 'Estoque de Produtos',
			material: 'kitchen',
			routerLink: [RouteLinkUtils.PRODUCT]
		},
		{
			label: 'Receitas e Despesas',
			material: 'kitchen',
			routerLink: [RouteLinkUtils.REVENUE_EXPENSE]
		}
	];
}

interface ReportLobbyItem {
	label: string;
	icon?: string;
	material?: string;
	routerLink: string[];
}
