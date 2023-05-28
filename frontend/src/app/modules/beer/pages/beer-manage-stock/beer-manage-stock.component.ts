import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { RouteLinkUtils } from '../../../../utils/route-link.utils';
import { ManageStockBeer } from '../../models/manage-stock-beer.model';
import { ViewBeer } from '../../models/view-beer.model';
import { BeerService } from '../../services/beer.service';

export interface BeerDialogProps {
	isOpen: boolean;
	updateMode: boolean;
	beerToUpdate: ViewBeer;
	rfid?: string;
}

@Component({
	selector: 'app-beer-manage-stock',
	templateUrl: './beer-manage-stock.component.html',
	styleUrls: ['./beer-manage-stock.component.scss']
})

export class BeerManageStockComponent implements OnInit {

	currentAction: 'entry' | 'removal' = 'entry';

	dialogState: BeerDialogProps = {
		isOpen: false,
		updateMode: false,
		beerToUpdate: {}
	};

	beers: ViewBeer[] = [];

	filteredProducts: ViewBeer[] = [];

	stockManageQueries: ManageStockBeer[] = [];

	cols: any[] = [];

	_isLoading = false;

	get isLoading(): boolean {
		return this._isLoading;
	}

	set isLoading(value: boolean) {
		this._isLoading = value;
	}

	beerInput: any = '';

	constructor(private beerService: BeerService, private location: Location, private utilsService: UtilsService) {
	}

	ngOnInit(): void {
		this.fetchBeers();
		this.defineCurrentActionByRoute();
		this.defineColumns();
	}

	private fetchBeers(): void {
		this.isLoading = true;
		this.beerService.getAll()
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (beers) => this.updateBeers(beers),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private updateBeers(beers: ViewBeer[]): void {
		this.beers = beers;
		this.filteredProducts = beers;
	}

	private defineCurrentActionByRoute(): void {
		const routePaths = this.location.path().split('/');
		routePaths[routePaths.length - 1] === RouteLinkUtils.ENTRANCE ? this.currentAction = 'entry' : this.currentAction = 'removal';
	}

	private defineColumns(): void {
		this.cols = [
			{ field: 'beer.name', header: 'Chope' },
			{ field: 'stock', header: 'Quantidade' }
		];
	}

	filterBeers(event: any): void {
		this.filteredProducts = this.beers.filter(beer => {
			return String(beer.rfid).indexOf(event.query) === 0;
		});
	}

	newStockQuery(beer: ViewBeer): void {
		const productIndex = this.stockManageQueries.findIndex(query => {
			return query.beer.id === beer?.id;
		});

		productIndex === -1 ? this.addNewItemToList(beer) : this.updateQueryAmount(productIndex);
		this.beerInput = '';
	}

	private addNewItemToList(beer: ViewBeer): void {
		this.stockManageQueries.push({ beer: beer, amount: 1 });
	}

	private updateQueryAmount(index: number): void {
		this.stockManageQueries[index].amount++;
	}

	newBeerByRfid(): void {
		const rfid = this.beerInput.toString();
		if (this.isRfidInvalid(rfid)) {
			this.utilsService.showErrorMessage('RFID inválido');
			return;
		}

		const index = this.beers.findIndex(beer => {
			return String(beer.rfid) === rfid;
		});

		index === -1 ? this.openBeerFormDialog() : this.newStockQuery(this.beers[index]);
	}

	private isRfidInvalid(rfid: string): boolean {
		return !this.beers.some(beer => beer.rfid == rfid);
	}

	deleteStockQuery(manageStockQuery: ManageStockBeer): void {
		this.stockManageQueries = this.stockManageQueries.filter(query => {
			return query.beer.id !== manageStockQuery.beer.id;
		});
	}

	openBeerFormDialog(): void {
		this.dialogState.rfid = this.beerInput;
		this.dialogState.isOpen = true;
		this.beerInput = '';
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

	get pageHeader(): string {
		return this.currentAction === 'entry' ? 'Entrada de Chope' : 'Saída de Chope';
	}

	newBeerSaved(beer: ViewBeer): void {
		this.beers.push(beer);
		this.newStockQuery(beer);
	}

	handleSubmitData(): void {
		this.beerService.restockBeers(this.buildDataToSave())
			.subscribe({
				next: () => {
					this.utilsService.showSuccessMessage('Movimentações cadastradas com sucesso');
					this.stockManageQueries = [];
				},
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private buildDataToSave(): ManageStockBeer[] {
		return this.stockManageQueries.map(query => {
			query.productId = query.beer.id;

			if (this.currentAction === 'removal') {
				query.amount = query.amount * -1;
			}

			return query;
		});
	}

	disableAddButton(): boolean {
		const rfid: string = this.beerInput.toString();
		return rfid.length != 6;
	}

}
