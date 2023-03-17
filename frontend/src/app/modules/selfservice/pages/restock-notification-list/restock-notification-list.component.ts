import { Component, HostListener, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { RestockNotification } from '../../../user/models/restock-notification.model';
import { RestockNotificationService } from '../../services/restock-notification.service';

@Component({
	selector: 'app-restock-notification-list',
	templateUrl: './restock-notification-list.component.html',
	styleUrls: ['./restock-notification-list.component.scss']
})
export class RestockNotificationListComponent implements OnInit {

	/**
	 * Waiting time in milliseconds between each automatic data fetching.
	 */
	private static readonly AUTOLOAD_DELAY: number = 5000;

	notifications: RestockNotification[] = [];
	confirmRestock: number | null = null;
	stopListenerDocumentClick: boolean = false;

	viewNotificationForm: boolean = false;
	newRequestCreated: boolean = false;


	private _isLoading = false;

	get isLoading(): boolean {
		return this._isLoading;
	}

	set isLoading(value: boolean) {
		this._isLoading = value;
	}

	constructor(
		private restockNotificationService: RestockNotificationService,
		private utilsService: UtilsService
	) {
		this.autoFetchNotifications();
	}

	ngOnInit(): void {
		this.findAllNotifications();
	}

	@HostListener('document:click')
	onDocumentClick() {
		if (this.stopListenerDocumentClick) {
			this.stopListenerDocumentClick = false;
		} else {
			this.confirmRestock = null;
		}
	}

	findAllNotifications(): void {
		this.isLoading = true;
		this.restockNotificationService.findAll()
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (res) => this.afterSuccessfulFetchNotifications(res),
				error: () => this.utilsService.showErrorMessage('Erro ao carregar dados')
			});
	}

	onRestockClick(notificationId: number) {
		this.stopListenerDocumentClick = true;
		this.confirmRestock = notificationId;
	}

	onConfirmRestock(): void {
		const notificationId: number = this.confirmRestock!;

		this.isLoading = true;
		this.restockNotificationService.replaceStock(notificationId)
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: () => this.notifications = this.notifications.filter(value => value.id !== notificationId),
				error: () => this.utilsService.showErrorMessage()
			});
	}

	onHideForm(): void {
		if (this.newRequestCreated) {
			this.newRequestCreated = false;
			this.findAllNotifications();
		}
	}

	private autoFetchNotifications() {
		interval(RestockNotificationListComponent.AUTOLOAD_DELAY)
			.subscribe(() => {
				if (!this.viewNotificationForm) {
					this.restockNotificationService.findAll()
						.subscribe((res) => this.afterSuccessfulFetchNotifications(res));
				}
			});
	}

	private afterSuccessfulFetchNotifications(res: RestockNotification[]) {
		this.notifications = res;
	}
}
