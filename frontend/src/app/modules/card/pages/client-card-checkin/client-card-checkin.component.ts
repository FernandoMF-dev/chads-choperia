import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { FormatUtils } from '../../../../utils/format.utils';
import { ClientService } from '../../../client/services/client.service';
import { ClientCardLink } from '../../models/client-card.model';
import { ClientCardService } from '../../services/client-card.service';

@Component({
	selector: 'app-client-card-checkin',
	templateUrl: './client-card-checkin.component.html',
	styleUrls: ['./client-card-checkin.component.scss']
})
export class ClientCardCheckinComponent implements OnInit {
	form: FormGroup;
	clientOptions: SelectItem[] = [];

	loadingClients: boolean = false;
	loadingLink: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private clientCardService: ClientCardService,
		private clientService: ClientService,
		private utilsService: UtilsService
	) {
		this.form = this.initializeForm();
	}

	ngOnInit(): void {
		this.findClients();
	}

	onSubmit(): void {
		if (!this.form.valid || this.loadingLink) {
			return;
		}
		this.loadingLink = true;

		const link: ClientCardLink = Object.assign(new ClientCardLink(), this.form.value);
		this.clientCardService.linkCardToCustomer(link)
			.pipe(finalize(() => {
				this.form.reset();
				this.findClients();
				return this.loadingLink = false;
			}))
			.subscribe({
				next: (res) => this.utilsService.showSuccessMessage(`Usuário ${ res.client!.name } agora está responsável pelo cartão ${ res.rfid }`),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	isFieldValid(fieldName: string): boolean {
		return this.utilsService.isFieldValid(this.form, fieldName);
	}

	private initializeForm(): FormGroup {
		return this.formBuilder.group({
			'rfid': ['', [Validators.required, Validators.min(10), Validators.min(10)]],
			'idClient': [null, [Validators.required]]
		});
	}

	private findClients(): void {
		this.loadingClients = true;
		this.clientService.getAll({ withCard: 'false' })
			.pipe(finalize(() => this.loadingClients = false))
			.subscribe({
				next: (res) => {
					this.clientOptions = res.map(client => ({
						label: `${ client.name } - ${ FormatUtils.formatTelephone(client.telephone) }`,
						value: client.id
					} as SelectItem));
				},
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

}
