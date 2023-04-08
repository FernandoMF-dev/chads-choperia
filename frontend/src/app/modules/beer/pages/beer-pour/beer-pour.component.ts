import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { Beer } from '../../models/beer.model';
import { Select } from '../../models/select.model';
import { BeerService } from '../../services/beer.service';

@Component({
	selector: 'app-beer-pour',
	templateUrl: './beer-pour.component.html',
	styleUrls: ['./beer-pour.component.scss']
})
export class BeerPourComponent implements OnInit {

	beers: Select[] = [];
	selectedBeer?: Select = new Select(new Beer('dsadsad', 0, 0, 0));

	viewBeerForm: boolean = false;

	_isLoading = false;

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
		this.selectedBeer = undefined;
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
		this.selectedBeer = this.beers[0];
	}

	get price() {
		console.log(this.selectedBeer);
		if (!!this.selectedBeer) {
			console.log(this.beers.filter(beer => beer.value === this.selectedBeer)[0]);
			return 'Valor : R$ ' + this.beers.filter(beer => beer.value === this.selectedBeer)[0].price;
		}
		return '';
	}

	set price(value: string) {

	}

}
