import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ActiveUserService } from '../../../../layout/service/auth/ActiveUserService';
import { UtilsService } from '../../../../services/utils.service';
import { RolesUtil } from '../../../../utils/RolesUtil';
import { RestockNotification } from '../../models/restock-notification.model';
import { RestockNotificationService } from '../../services/restock-notification.service';

@Component({
	selector: 'app-restock-notification-list',
	templateUrl: './restock-notification-list.component.html',
	styleUrls: ['./restock-notification-list.component.scss']
})
export class RestockNotificationListComponent implements OnInit, OnDestroy {

	/**
	 * Waiting time in milliseconds between each automatic data fetching.
	 */
	private static readonly AUTOLOAD_DELAY: number = 5000;

	modes: RestockNotificationListComponentModes;

	notifications: RestockNotification[] = [];
	confirmRestock: number | null = null;
	confirmCancel: number | null = null;
	stopListenerDocumentClick: boolean = false;

	viewNotificationForm: boolean = false;
	newRequestCreated: boolean = false;

	private autoFetch: Subscription;
	private _isLoading = false;

	private userService: ActiveUserService;

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
		this.userService = ActiveUserService.getInstance();
		this.autoFetch = this.autoFetchNotifications();
		this.modes = this.initiateComponentModes();
	}

	ngOnInit(): void {
		this.findAllNotifications();
	}

	ngOnDestroy(): void {
		this.autoFetch.unsubscribe();
	}

	@HostListener('document:click')
	onDocumentClick() {
		if (this.stopListenerDocumentClick) {
			this.stopListenerDocumentClick = false;
		} else {
			this.confirmRestock = null;
			this.confirmCancel = null;
		}
	}

	findAllNotifications(): void {
		this.isLoading = true;
		this.restockNotificationService.findAll()
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (res) => this.afterSuccessfulFetchNotifications(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	onCancelClick(notificationId: number) {
		this.stopListenerDocumentClick = true;
		this.confirmCancel = notificationId;
		this.confirmRestock = null;
	}

	onRestockClick(notificationId: number) {
		this.stopListenerDocumentClick = true;
		this.confirmCancel = null;
		this.confirmRestock = notificationId;
	}

	onConfirmCancel(): void {
		const notificationId: number = this.confirmCancel!;

		this.isLoading = true;
		this.restockNotificationService.cancel(notificationId)
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: () => this.notifications = this.notifications.filter(value => value.id !== notificationId),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	onConfirmRestock(): void {
		const notificationId: number = this.confirmRestock!;

		this.isLoading = true;
		this.restockNotificationService.replaceStock(notificationId)
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: () => this.notifications = this.notifications.filter(value => value.id !== notificationId),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	onHideForm(): void {
		if (this.newRequestCreated) {
			this.newRequestCreated = false;
			this.findAllNotifications();
		}
	}

	private initiateComponentModes(): RestockNotificationListComponentModes {
		const user = this.userService.getUser()!;
		return {
			cooker: user.roleNames?.some(role => role === RolesUtil.COOK)!,
			monitor: user.roleNames?.some(role => role === RolesUtil.FOOD_MONITOR)!
		};
	}

	private autoFetchNotifications(): Subscription {
		return interval(RestockNotificationListComponent.AUTOLOAD_DELAY)
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

interface RestockNotificationListComponentModes {
	cooker: boolean;
	monitor: boolean;
}
