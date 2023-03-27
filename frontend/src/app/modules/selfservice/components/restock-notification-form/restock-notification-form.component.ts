import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { RestockNotification } from '../../models/restock-notification.model';
import { RestockNotificationService } from '../../services/restock-notification.service';

@Component({
	selector: 'app-restock-notification-form',
	templateUrl: './restock-notification-form.component.html',
	styleUrls: ['./restock-notification-form.component.scss']
})
export class RestockNotificationFormComponent {

	@Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() create: EventEmitter<RestockNotification> = new EventEmitter<RestockNotification>();
	@Output() showDialog: EventEmitter<void> = new EventEmitter<void>();
	@Output() hideDialog: EventEmitter<void> = new EventEmitter<void>();

	restockForm: FormGroup;

	private _visible: boolean = false;
	private _isLoading = false;

	@Input() get visible(): boolean {
		return this._visible;
	}

	set visible(value: boolean) {
		if (value !== this._visible) {
			this._visible = value;
			this.visibleChange.emit(value);
		}
	}

	get isLoading(): boolean {
		return this._isLoading;
	}

	set isLoading(value: boolean) {
		this._isLoading = value;
	}

	constructor(
		private restockNotificationService: RestockNotificationService,
		private formBuilder: FormBuilder,
		private utilsService: UtilsService
	) {
		this.restockForm = this.formBuilder.group({
			'replaceItemMessage': ['', [Validators.required, Validators.minLength(3)]]
		});
	}

	isFieldValid(fieldName: string): boolean | undefined {
		return this.utilsService.isFieldValid(this.restockForm, fieldName);
	}

	sendNotification(): void {
		this.isLoading = true;

		const message: string = this.restockForm.value['replaceItemMessage'];

		this.restockNotificationService.create(message)
			.pipe(finalize(() => {
				this.clearForm();
				this.isLoading = false;
			}))
			.subscribe({
				next: (res) => this.create.emit(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private clearForm(): void {
		this.restockForm.reset();
	}
}
