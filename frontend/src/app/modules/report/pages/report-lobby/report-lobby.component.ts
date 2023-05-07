import { Component } from '@angular/core';
import { RouteLinkUtils } from '../../../../utils/route-link.utils';
import { ReportLobbyItem } from '../../models/report-lobby-item.model';

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
		}
	];
}
