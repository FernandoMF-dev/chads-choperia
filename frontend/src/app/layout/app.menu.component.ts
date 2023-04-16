import { Component, OnInit } from '@angular/core';
import { RouteLinkUtils } from '../utils/route-link.utils';
import { LayoutService } from './service/app.layout.service';

@Component({
	selector: 'app-menu',
	templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

	model: any[] = [];

	constructor(public layoutService: LayoutService) {
	}

	ngOnInit() {
		this.model = [
			{
				label: 'Home',
				items: [
					{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
				]
			},
			{
				label: 'Registros Administrativos',
				items: [
					{ label: 'Usuários', icon: 'pi pi-fw pi-user', routerLink: [RouteLinkUtils.USER] },
					{ label: 'Produtos', icon: 'pi pi-fw pi-box', routerLink: [RouteLinkUtils.PRODUCT] },
					{ label: 'Chopes', material: 'sports_bar', routerLink: [RouteLinkUtils.BEER] }
				]
			},
			{
				label: 'Menu do Fiscal de Entrada',
				items: [
					{ label: 'Clientes', icon: 'pi pi-fw pi-id-card', routerLink: [RouteLinkUtils.CLIENTE] },
					{
						label: 'Vincular Cartão',
						icon: 'pi pi-fw pi-credit-card',
						routerLink: [RouteLinkUtils.CARD, RouteLinkUtils.CLIENTE, RouteLinkUtils.ENTRANCE]
					}
				]
			},
			{
				label: 'Menu do Caixa',
				items: [
					{
						label: 'Fechar Conta',
						material: 'point_of_sale',
						routerLink: [RouteLinkUtils.CARD, RouteLinkUtils.CLIENTE, RouteLinkUtils.PAYMENT]
					}
				]
			},
			{
				label: 'Menu do Cozinheiro',
				items: [
					{
						label: 'Saída de Estoque',
						icon: 'pi pi-fw pi-arrow-down-right',
						routerLink: [RouteLinkUtils.PRODUCT, RouteLinkUtils.EXIT]
					},
					{ label: 'Self Service', icon: 'pi pi-fw pi-download', routerLink: [RouteLinkUtils.SELF_SERVICE] }
				]
			},
			{
				label: 'Menu do Fiscal de Estoque',
				items: [
					{
						label: 'Entrada de Estoque',
						icon: 'pi pi-fw pi-arrow-up-right',
						routerLink: [RouteLinkUtils.PRODUCT, RouteLinkUtils.ENTRANCE]
					},
					{
						label: 'Entrada de Chope',
						icon: 'pi pi-fw pi-arrow-up-right',
						routerLink: [RouteLinkUtils.BEER, RouteLinkUtils.ENTRANCE]
					}
				]
			},
			{
				label: 'Área do cliente',
				items: [
					{ label: 'Chopes', material: 'sports_bar', routerLink: [RouteLinkUtils.BEER, RouteLinkUtils.EXIT] }
				]
			}
		];
	}
}
