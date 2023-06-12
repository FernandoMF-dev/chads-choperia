import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { SelfserviceSettings } from '../../models/selfservice-settings';
import { SelfserviceService } from '../../services/selfservice.service';

@Component({
	selector: 'app-selfservice-settings',
	templateUrl: './selfservice-settings.component.html',
	styleUrls: ['./selfservice-settings.component.scss']
})
export class SelfserviceSettingsComponent implements OnInit {
	form: FormGroup;
	currentSettings?: SelfserviceSettings;

	isLoading: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private selfserviceService: SelfserviceService,
		private utilsService: UtilsService
	) {
		this.form = this.initializeForm();
	}

	get hasSettingBeenAltered(): boolean {
		const formValue: Partial<SelfserviceSettings> = this.form.value;
		return formValue.priceBase != this.currentSettings?.priceBase || formValue.pricePerKg != this.currentSettings?.pricePerKg;
	}

	private initializeForm(): FormGroup {
		return this.formBuilder.group({
			'priceBase': [0.0, [Validators.required, Validators.min(0)]],
			'pricePerKg': [0.0, [Validators.required, Validators.min(0)]]
		});
	}

	ngOnInit(): void {
		this.fetchCurrentSettings();
	}

	isFieldValid(fieldName: string): boolean {
		return this.utilsService.isFieldValid(this.form, fieldName);
	}

	onSubmit(): void {
		if (!this.form.valid || !this.hasSettingBeenAltered) {
			return;
		}

		const entity: SelfserviceSettings = this.form.value;
		this.selfserviceService.changeSettings(entity)
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (res) => {
					this.utilsService.showSuccessMessage('Configurações de self-service salvas com sucesso');
					this.resetForm(res);
				},
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}

	resetForm(res: SelfserviceSettings | undefined = this.currentSettings): void {
		this.currentSettings = res == null ? new SelfserviceSettings(0.0, 0.0) : res;
		this.form.reset(this.currentSettings);
	}

	private fetchCurrentSettings(): void {
		this.isLoading = true;
		this.selfserviceService.getCurrentSetting()
			.pipe(finalize(() => this.isLoading = false))
			.subscribe({
				next: (res) => this.resetForm(res),
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}
}
