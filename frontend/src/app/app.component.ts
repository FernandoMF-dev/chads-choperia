import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

	constructor(private primengConfig: PrimeNGConfig) {
	}

	ngOnInit() {
		this.primengConfig.ripple = true;
		this.setPrimengTranslation();
	}

	private setPrimengTranslation(): void {
		this.primengConfig.setTranslation({
			firstDayOfWeek: 1,
			dayNames: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
			dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
			dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
			monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
			monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
			today: 'Hoje',
			clear: 'Limpar',
			dateFormat: 'dd/mm/yy'
		});
	}
}
