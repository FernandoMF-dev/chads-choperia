import { Component, OnInit, ViewChild } from '@angular/core';
import { InputNumber } from 'primeng/inputnumber';
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

	beers: Beer[] = [];

	viewBeerForm: boolean = false;

	_isLoading = false;

	selected: Pour = new Pour();

	visible: boolean = false;

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
				next: (res) => this.beers = res,
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	pourDrink() {
		this.beerService.pourBeer(this.selected)
			.pipe(finalize(() => {
				this.clearSelected()
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


	handleFocus(){
		document.getElementById('inputCard')?.focus();
	}

	clearSelected(){
		this.selected = new Pour();
	}
}
