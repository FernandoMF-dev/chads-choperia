import { Component, OnInit } from '@angular/core';
import { RolesUtil } from '../utils/RolesUtil';
import { RouteLinkUtils } from '../utils/route-link.utils';
import { AppMenuitemType } from './interfaces/app.menuitem.type';
import { LayoutService } from './service/app.layout.service';
import { ActiveUserService } from './service/auth/ActiveUserService';

@Component({
	selector: 'app-menu',
	templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

	model: AppMenuitemType[] = [];
	private userService: ActiveUserService;
	private mappedMenus: Map<RolesUtil, AppMenuitemType[]>;

	constructor(public layoutService: LayoutService) {
		this.userService = ActiveUserService.getInstance();
		this.mappedMenus = this.initiateMappedMenus();
	}

	ngOnInit(): void {
		const user = this.userService.getUser();
		const isLogged = this.userService.isLogged();
		this.model = [];

		if (isLogged) {
			this.mappedMenus.forEach((menu, key) => {
				if (user?.roleNames?.some(role => role === key)) {
					this.model.push(...menu);
				}
			});
		} else {
			this.model.push(...this.getPublicMenu());
		}
	}

	private initiateMappedMenus(): Map<RolesUtil, AppMenuitemType[]> {
		return new Map<RolesUtil, AppMenuitemType[]>([
			[RolesUtil.ADMIN, [...this.getAdminMenu()]],
			[RolesUtil.CASHIER, [...this.getCashierMenu()]],
			[RolesUtil.COSTUMER, []],
			[RolesUtil.COOK, [...this.getCookMenu()]],
			[RolesUtil.COSTUMER_MONITOR, [...this.getCostumerMonitorMenu()]],
			[RolesUtil.FOOD_MONITOR, [...this.getFoodMonitorMenu()]],
			[RolesUtil.STOCK_MONITOR, [...this.getStockManagerMenu()]]
		]);
	}

	private getPublicMenu(): AppMenuitemType[] {
		return [
			{
				label: 'Área do cliente',
				items: [
					{ label: 'Chopes', material: 'sports_bar', routerLink: [RouteLinkUtils.BEER, RouteLinkUtils.EXIT] },
					{
						label: 'Self-Service',
						material: 'restaurant',
						routerLink: [RouteLinkUtils.SELF_SERVICE, RouteLinkUtils.FOOD_WEIGHING]
					}
				]
			}
		];
	}

	private getAdminMenu(): AppMenuitemType[] {
		return [
			{
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
			}
		];
	}

	private getCashierMenu(): AppMenuitemType[] {
		return [
			{
				label: 'Menu do Caixa',
				items: [
					{
						label: 'Fechar Conta',
						material: 'point_of_sale',
						routerLink: [RouteLinkUtils.CARD, RouteLinkUtils.CLIENTE, RouteLinkUtils.PAYMENT]
					}
				]
			}
		];
	}

	private getCookMenu(): AppMenuitemType[] {
		return [
			{
				label: 'Menu do Cozinheiro',
				items: [
					{
						label: 'Saída de Estoque',
						icon: 'pi pi-fw pi-arrow-down-right',
						routerLink: [RouteLinkUtils.PRODUCT, RouteLinkUtils.EXIT]
					},
					{ label: 'Notificação de Self Service', icon: 'pi pi-fw pi-bell', routerLink: [RouteLinkUtils.SELF_SERVICE] }
				]
			}
		];
	}

	private getCostumerMonitorMenu(): AppMenuitemType[] {
		return [
			{
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
			}
		];
	}

	private getFoodMonitorMenu(): AppMenuitemType[] {
		return [
			{
				label: 'Menu do Fiscal de Self-service',
				items: [
					{ label: 'Notificar falta', icon: 'pi pi-fw pi-bell', routerLink: [RouteLinkUtils.SELF_SERVICE] }
				]
			}
		];
	}

	private getStockManagerMenu(): AppMenuitemType[] {
		return [
			{
				label: 'Menu do Fiscal de Estoque',
				items: [
					{
						label: 'Entrada de Estoque',
						icon: 'pi pi-fw pi-box',
						routerLink: [RouteLinkUtils.PRODUCT, RouteLinkUtils.ENTRANCE]
					},
					{
						label: 'Entrada de Chope',
						material: 'sports_bar',
						routerLink: [RouteLinkUtils.BEER, RouteLinkUtils.ENTRANCE]
					}
				]
			}
		];
	}
}
