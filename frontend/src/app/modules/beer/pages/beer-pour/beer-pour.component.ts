import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { Beer } from '../../models/beer.model';
import { Pour } from '../../models/pour.model';
import { BeerService } from '../../services/beer.service';

@Component({
	selector: 'app-beer-pour',
	templateUrl: './beer-pour.component.html',
	styleUrls: ['./beer-pour.component.scss']
})
export class BeerPourComponent implements OnInit {

	beers: Beer[] = [];

	selected: Pour = new Pour();

	visible: boolean = false;

	constructor(
		private beerService: BeerService,
		private utilsService: UtilsService
	) {
	}

	ngOnInit() {
		this.fetchBeers();
	}

	fetchBeers(): void {
		this.selected = new Pour();
		this.beerService.getAllComplete({ 'onStock': `${ true }` })
			.subscribe({
				next: (res) => this.beers = res,
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	pourDrink() {
		this.beerService.pourBeer(this.selected)
			.pipe(finalize(() => {
				this.clearSelected();
				this.fetchBeers();
				this.visible = false;
			}))
			.subscribe({
				next: () => this.utilsService.showSuccessMessage('Bebida debitada com sucesso'),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	openModal(beer: Beer) {
		this.selected.beer = beer.id;
		this.visible = true;
	}

	handleFocus() {
		document.getElementById('inputCard')?.focus();
	}

	clearSelected() {
		this.selected = new Pour();
	}
}
