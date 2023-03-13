import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

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
					{ label: 'Self Service', icon: 'pi pi-fw pi-download', routerLink: ['/self-service'] }
				]
            },
        ];
    }
}
