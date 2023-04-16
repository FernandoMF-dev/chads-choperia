import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { FormatUtils } from '../../../../utils/format.utils';
import { ClientService } from '../../../client/services/client.service';
import { ClientCard } from '../../models/client-card.model';
import { ClientCardService } from '../../services/client-card.service';

@Component({
	selector: 'app-client-card-checkout',
	templateUrl: './client-card-checkout.component.html',
	styleUrls: ['./client-card-checkout.component.scss']
})
export class ClientCardCheckoutComponent {
	rfid: string = '';
	clientCard?: ClientCard;

	isLoadingRfid: boolean = false;
	isLoadingSubmit: boolean = false;

	constructor(
		private clientCardService: ClientCardService,
		private clientService: ClientService,
		private utilsService: UtilsService
	) {
	}

	get isLoading(): boolean {
		return this.isLoadingSubmit || this.isLoadingRfid;
	}

	get situation(): 'valid' | 'invalid' | 'undefined' {
		if (this.clientCard == null || !this.rfid) {
			return 'undefined';
		}
		return this.clientCard.change! < 0 ? 'invalid' : 'valid';
	}

	findCardByRfid(): void {
		this.isLoadingRfid = true;
		this.clientCardService.findOpenByRfid(this.rfid!, true)
			.pipe(finalize(() => this.isLoadingRfid = false))
			.subscribe({
				next: (res) => this.clientCard = res,
				error: (err) => {
					this.utilsService.showErrorMessage(err.error.detail);
					this.resetForm();
				}
			});
	}

	onSubmit(): void {
		if (this.isLoading || this.situation !== 'valid') {
			return;
		}

		this.isLoadingSubmit = true;
		this.clientCardService.unlinkCardFromCustomer(this.rfid)
			.pipe(finalize(() => {
				this.isLoadingSubmit = false;
				this.resetForm();
			}))
			.subscribe({
				next: () => this.utilsService.showSuccessMessage(`Cartão ${ this.rfid } desvinculado do cliente "${ this.getClientName() }" com sucesso.`),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	getClientName(): string | null {
		if (!this.clientCard || !this.clientCard.client) {
			return null;
		}

		return `${ this.clientCard.client.name } - ${ FormatUtils.formatTelephone(this.clientCard.client.telephone) }`;
	}

	resetForm(): void {
		this.rfid = '';
		this.clientCard = undefined;
	}
}
