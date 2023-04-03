import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { Beer } from '../../models/beer.model';
import { BeerService } from '../../services/beer.service';

@Component({
	selector: 'app-beer-form',
	templateUrl: './beer-form.component.html',
	styleUrls: ['./beer-form.component.scss']
})
export class BeerFormComponent implements OnInit {
	@Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() save: EventEmitter<Beer> = new EventEmitter<Beer>();
	@Output() cancel: EventEmitter<void> = new EventEmitter<void>();
	@Output() showDialog: EventEmitter<void> = new EventEmitter<void>();
	@Output() hideDialog: EventEmitter<void> = new EventEmitter<void>();

	@Input() idBeer?: number;

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
		private beerService: BeerService,
		private utilsService: UtilsService
	) {
		this.userForm = this.initializeFormGroup();
	}

	private initializeFormGroup(): FormGroup {
		return new FormGroup({
			id: new FormControl(null, []),
			name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
			purchasePrice: new FormControl(0, [Validators.required, Validators.min(0)]),
			valuePerMug: new FormControl(0, [Validators.required, Validators.min(0)]),
			rfid: new FormControl('', [Validators.required])
		});
	}

	ngOnInit(): void {
		if (this.idBeer) {
			this.fetchBeerToEdit();
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

		const entity: Beer = this.userForm.value;

		if (this.idBeer) {
			this.update(entity);
		} else {
			this.create(entity);
		}
	}

	private create(entity: Beer): void {
		this.beerService.create(entity)
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (res) => {
					this.save.emit(res);
					this.visible = false;
				},
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private update(entity: Beer): void {
		this.beerService.update(entity)
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (res) => {
					this.save.emit(res);
					this.visible = false;
				},
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	private fetchBeerToEdit(): void {
		this.isLoading = true;

		this.beerService.getById(this.idBeer!)
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (res) => this.userForm.reset(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}
}
