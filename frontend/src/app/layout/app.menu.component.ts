import { Component, OnInit } from '@angular/core';
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
					{ label: 'Usuários', icon: 'pi pi-fw pi-user', routerLink: ['/usuario'] },
					{ label: 'Produtos', icon: 'pi pi-fw pi-box', routerLink: ['/produto'] },
					{ label: 'Chopes', material: 'sports_bar', routerLink: ['/chope'] }
				]
			},
			{
				label: 'Menu do Fiscal de Entrada',
				items: [
					{ label: 'Clientes', icon: 'pi pi-fw pi-id-card', routerLink: ['/cliente'] },
					{ label: 'Vincular Cartão', icon: 'pi pi-fw pi-credit-card', routerLink: ['/cartao/cliente/vincular'] }
				]
			},
			{
				label: 'Menu do Cozinheiro',
				items: [
					{ label: 'Saída de Estoque', icon: 'pi pi-fw pi-arrow-down-right', routerLink: ['/produto/saida'] },
					{ label: 'Self Service', icon: 'pi pi-fw pi-download', routerLink: ['/self-service'] }
				]
			},
			{
				label: 'Menu do Fiscal de Estoque',
				items: [
					{ label: 'Entrada de Estoque', icon: 'pi pi-fw pi-arrow-up-right', routerLink: ['/produto/entrada'] }
				]
			},
			{
				label: 'Área do cliente',
				items: [
					{ label: 'Chopes', material: 'sports_bar', routerLink: ['/chope/saida'] }
				]
			}
		];
	}
}
