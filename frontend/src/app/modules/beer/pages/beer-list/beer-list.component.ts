import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { Beer } from '../../models/beer.model';
import { BeerService } from '../../services/beer.service';

@Component({
	selector: 'app-beer-list',
	templateUrl: './beer-list.component.html',
	styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit {

	beers: Beer[] = [];
	selectedBeer?: Beer;
	cols: any[];

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
		this.cols = this.initializeCols();
	}

	ngOnInit() {
		this.fetchBeers();
	}

	fetchBeers(): void {
		this.isLoading = true;
		this.selectedBeer = undefined;
		this.beerService.getAll()
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (res) => this.updateBeers(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private updateBeers(beers: Beer[]): void {
		this.beers = beers;
	}

	private initializeCols(): any[] {
		return [
			{ field: 'name', header: 'Nome' },
			{ field: 'stock', header: 'Estoque (L)' }
		];
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

	insertBeer(): void {
		this.selectedBeer = undefined;
		this.viewBeerForm = true;
	}

	editBeer(beer: Beer): void {
		this.selectedBeer = beer;
		this.viewBeerForm = true;
	}

	confirmDeleteBeer(beer: Beer): void {
		this.selectedBeer = beer;

		this.utilsService.displayConfirmationMessage(
			'Excluir Chope',
			`Tem certeza que quer remover o chope <strong>${ this.selectedBeer!.name }</strong>?`,
			this,
			() => this.deleteBeer()
		);
	}

	private deleteBeer(): void {
		this.isLoading = true;
		this.beerService.delete(this.selectedBeer!.id!)
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: () => this.fetchBeers(),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}
}
