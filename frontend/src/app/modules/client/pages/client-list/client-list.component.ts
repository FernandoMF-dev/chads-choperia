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
	selectedClient?: Client;
	cols: any[];

	viewClientForm: boolean = false;

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
		this.cols = this.initializeCols();
	}

	ngOnInit() {
		this.fetchClients();
	}

	fetchClients(): void {
		this.isLoading = true;
		this.selectedClient = undefined;
		this.clientService.getAll()
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (res) => this.updateClients(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private updateClients(clients: Client[]): void {
		this.clients = clients;
	}

	private initializeCols(): any[] {
		return [
			{ field: 'name', header: 'Nome' },
			{ field: 'telephone', header: 'Telefone' },
			{ field: 'email', header: 'E-mail' }
		];
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

	insertClient(): void {
		this.selectedClient = undefined;
		this.viewClientForm = true;
	}

	editClient(client: Client): void {
		this.selectedClient = client;
		this.viewClientForm = true;
	}

	confirmDeleteClient(client: Client): void {
		this.selectedClient = client;

		this.utilsService.displayConfirmationMessage(
			'Excluir cliente',
			`Tem certeza que quer excluir o cliente <strong>${ this.selectedClient!.name }</strong>?`,
			this,
			() => this.deleteClient()
		);
	}

	private deleteClient(): void {
		this.isLoading = true;
		this.clientService.delete(this.selectedClient!.id!)
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: () => this.fetchClients(),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}
}
