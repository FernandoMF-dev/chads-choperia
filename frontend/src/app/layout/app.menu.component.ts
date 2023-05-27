import { Component, OnInit } from '@angular/core';
import { RolesUtil } from '../utils/RolesUtil';
import { RouteLinkUtils } from '../utils/route-link.utils';
import { LayoutService } from './service/app.layout.service';
import { ActiveUserService } from './service/auth/ActiveUserService';

@Component({
	selector: 'app-menu',
	templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

	model: any[] = [];

	constructor(public layoutService: LayoutService) {
	}

	ngOnInit() {
		const userService: ActiveUserService = ActiveUserService.getInstance();
		const user = userService.getUser();
		const isLogged = userService.isLogged();
		if(isLogged){
			this.model = [];
			const notFound: number = -1;
			if (user?.roleNames?.indexOf(RolesUtil.ADMIN) != notFound) {
				this.model.push(this.getAdminMenu());
			}
			if (user?.roleNames?.indexOf(RolesUtil.COOK) != notFound) {
				this.model.push(this.getCookMenu());
			}
			if (user?.roleNames?.indexOf(RolesUtil.COSTUMER_MONITOR) != notFound) {
				this.model.push(this.getCostumerMonitorMenu());
			}
			if (user?.roleNames?.indexOf(RolesUtil.CASHIER) != notFound) {
				this.model.push(this.getCashierMenu());
			}
			if (user?.roleNames?.indexOf(RolesUtil.STOCK_MONITOR) != notFound) {
				this.model.push(this.getStockManagerMenu());
			}
		}else {
			this.model.push(this.getCostumerMenu());
		}
	}

	private getCostumerMenu(): {
		label: string;
		items: ({ routerLink: (string)[]; material: string; label: string })[]
	} {
		return {
			label: 'Área do cliente',
			items: [
				{ label: 'Chopes', material: 'sports_bar', routerLink: [RouteLinkUtils.BEER, RouteLinkUtils.EXIT] },
				{
					label: 'Self-Service',
					material: 'restaurant',
					routerLink: [RouteLinkUtils.SELF_SERVICE, RouteLinkUtils.FOOD_WEIGHING]
				}
			]
		};
	}

	private getStockManagerMenu(): {
		label: string;
		items: ({ routerLink: (string)[]; icon: string; label: string })[]
	} {
		return {
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
		};
	}

	private getCookMenu(): {
		label: string;
		items: ({ routerLink: (string)[]; icon: string; label: string })[]
	} {
		return {
			label: 'Menu do Cozinheiro',
			items: [
				{
					label: 'Saída de Estoque',
					icon: 'pi pi-fw pi-arrow-down-right',
					routerLink: [RouteLinkUtils.PRODUCT, RouteLinkUtils.EXIT]
				},
				{ label: 'Self Service', icon: 'pi pi-fw pi-download', routerLink: [RouteLinkUtils.SELF_SERVICE] }
			]
		};
	}

	private getCashierMenu(): { label: string; items: { routerLink: (string)[]; material: string; label: string }[] } {
		return {
			label: 'Menu do Caixa',
			items: [
				{
					label: 'Fechar Conta',
					material: 'point_of_sale',
					routerLink: [RouteLinkUtils.CARD, RouteLinkUtils.CLIENTE, RouteLinkUtils.PAYMENT]
				}
			]
		};
	}

	private getCostumerMonitorMenu(): {
		label: string;
		items: ({ routerLink: string[]; icon: string; label: string } | { routerLink: (string)[]; material: string; label: string })[]
	} {
		return {
			label: 'Menu do Fiscal de Entrada',
			items: [
				{ label: 'Clientes', icon: 'pi pi-fw pi-id-card', routerLink: [RouteLinkUtils.CLIENTE] },
				{
					label: 'Vincular Cartão',
					material: 'add_card',
					routerLink: [RouteLinkUtils.CARD, RouteLinkUtils.CLIENTE, RouteLinkUtils.ENTRANCE]
				},
				{
					label: 'Desvincular Cartão',
					material: 'credit_card_off',
					routerLink: [RouteLinkUtils.CARD, RouteLinkUtils.CLIENTE, RouteLinkUtils.EXIT]
				}
			]
		};
	}

	private getAdminMenu(): {
		label: string;
		items: ({ routerLink: string[]; icon: string; label: string } | { routerLink: string[]; material: string; label: string })[]
	} {
		return {
			label: 'Registros Administrativos',
			items: [
				{ label: 'Usuários', icon: 'pi pi-fw pi-user', routerLink: [RouteLinkUtils.USER] },
				{ label: 'Produtos', icon: 'pi pi-fw pi-box', routerLink: [RouteLinkUtils.PRODUCT] },
				{ label: 'Chopes', material: 'sports_bar', routerLink: [RouteLinkUtils.BEER] },
				{
					label: 'Configurações do Self-Service',
					material: 'restaurant_menu',
					routerLink: [RouteLinkUtils.SELF_SERVICE, RouteLinkUtils.SETTING]
				},
				{ label: 'Relatórios', material: 'view_list', routerLink: [RouteLinkUtils.REPORT] },
				{ label: 'E-mail', material: 'email', routerLink: [RouteLinkUtils.EMAIL] }
			]
		};
	}
}
