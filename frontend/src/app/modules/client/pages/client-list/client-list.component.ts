import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
	selector: 'app-client-list',
	templateUrl: './client-list.component.html',
	styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

	clients: Client[] = [];

	_isLoading = false;

	get isLoading(): boolean {
		return this._isLoading;
	}

	set isLoading(value: boolean) {
		this._isLoading = value;
	}

	constructor(
		private clientService: ClientService,
		private utilsService: UtilsService
	) {
	}

	ngOnInit() {
		this.fetchClients();
	}

	private fetchClients(): void {
		this.isLoading = true;
		this.clientService.getAll()
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (res) => this.updateClients(res),
				error: () => this.utilsService.showErrorMessage('Erro ao carregar dados')
			});
	}

	private updateClients(clients: Client[]): void {
		this.clients = clients;
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

	insertClient(): void {
		// TODO Implement method
	}

	editClient(client: Client): void {
		// TODO Implement method
	}

	deleteClient(client: Client): void {
		// TODO Implement method
	}
}
