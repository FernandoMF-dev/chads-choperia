import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { CustomValidators } from '../../../../utils/custom-validators.utils';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
	selector: 'app-client-form',
	templateUrl: './client-form.component.html',
	styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
	@Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() save: EventEmitter<Client> = new EventEmitter<Client>();
	@Output() cancel: EventEmitter<void> = new EventEmitter<void>();
	@Output() showDialog: EventEmitter<void> = new EventEmitter<void>();
	@Output() hideDialog: EventEmitter<void> = new EventEmitter<void>();

	@Input() idClient?: number;

	userForm: FormGroup;

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
		private clientService: ClientService,
		private utilsService: UtilsService
	) {
		this.userForm = this.initializeFormGroup();
	}

	private initializeFormGroup(): FormGroup {
		return new FormGroup({
			id: new FormControl(null, []),
			name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
			telephone: new FormControl('', [Validators.required, Validators.minLength(8)]),
			email: new FormControl('', [Validators.required, Validators.email]),
			cpf: new FormControl('', [Validators.required, CustomValidators.cpf])
		});
	}

	ngOnInit(): void {
		if (this.idClient) {
			this.fetchClientToEdit();
		}
	}

	isFieldValid(fieldName: string): boolean {
		return this.utilsService.isFieldValid(this.userForm, fieldName);
	}

	onCancel(): void {
		this.userForm.reset();
		this.cancel.emit();
		this.visible = false;
	}

	onSubmit(): void {
		if (!this.userForm.valid || this.isLoading) {
			return;
		}
		this.isLoading = true;

		const entity: Client = this.userForm.value;

		this.clientService.create(entity)
			.pipe(finalize(() => {
				this.isLoading = false;
				this.visible = false;
			}))
			.subscribe({
				next: (res) => this.save.emit(res),
				error: () => this.utilsService.showErrorMessage('Erro ao salvar mudanças')
			});
	}

	private fetchClientToEdit(): void {
		this.isLoading = true;

		this.clientService.getById(this.idClient!)
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (res) => this.userForm.reset(res),
				error: () => this.utilsService.showErrorMessage('Erro ao recuperar dados')
			});
	}
}
