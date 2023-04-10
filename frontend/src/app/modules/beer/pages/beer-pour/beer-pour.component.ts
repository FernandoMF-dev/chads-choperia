import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { Beer } from '../../models/beer.model';
import { Pour } from '../../models/pour.model';
import { Select } from '../../models/select.model';
import { BeerService } from '../../services/beer.service';

@Component({
	selector: 'app-beer-pour',
	templateUrl: './beer-pour.component.html',
	styleUrls: ['./beer-pour.component.scss']
})
export class BeerPourComponent implements OnInit {

	beers: Select[] = [];
	selectedBeer?: Select = new Select(new Beer('dsadsad', 0, 0, 0, '0'));

	viewBeerForm: boolean = false;

	_isLoading = false;

	selected: Pour = new Pour();

	get isLoading(): boolean {
		return this._isLoading;
	}

	set isLoading(value: boolean) {
		this._isLoading = value;
	}

	constructor(
		private beerService: BeerService,
		private utilsService: UtilsService
	) {
	}

	ngOnInit() {
		this.fetchBeers();
	}

	fetchBeers(): void {
		this.isLoading = true;
		this.selected = new Pour();
		this.beerService.getAllComplete()
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (res) => this.updateBeers(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private updateBeers(beers: Beer[]): void {
		const beersAux: Select[] = [];
		beers.forEach(beer => {
			beersAux.push(new Select(beer));
		});
		this.beers = beersAux;
		this.selected.beer = this.beers[0].value;
	}

	get price(): number {
		if (!!this.selected.beer) {
			return this.beers.filter(beer => beer.value === this.selected.beer)[0].price!;
		}
		return 0;
	}

	pourDrink() {
		this.beerService.pourBeer(this.selected)
			.pipe(finalize(() => this.selected.card = undefined))
			.subscribe({
				next: () => this.utilsService.showSuccessMessage('Bebida debitada com sucesso'),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	handleFocus() {
		document.getElementById('inputCard')?.focus();
	}

}
