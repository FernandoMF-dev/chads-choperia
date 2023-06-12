import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { SelfserviceService } from '../../services/selfservice.service';
import { ScaleService } from 'src/app/services/scale.service';

@Component({
	selector: 'app-food-weighing',
	templateUrl: './food-weighing.component.html',
	styleUrls: ['./food-weighing.component.scss']
})
export class FoodWeighingComponent {
	form: FormGroup;

	constructor(
		private utilsService: UtilsService,
		private selfserviceService: SelfserviceService,
		private scaleService: ScaleService
	) {
		this.form = new FormGroup({
			cardRfid: new FormControl('', [Validators.required]),
			weight: new FormControl('', [Validators.required])
		});

		setInterval(() => {
			this.refreshWeight();
		}, 1000)
	}

	private refreshWeight(): void {
		this.scaleService.getWeight().subscribe((weight) => {
			this.form.get('weight')?.setValue(weight.lastWeight);
		});
	}

	isFieldValid(fieldName: string): boolean {
		return this.utilsService.isFieldValid(this.form, fieldName);
	}

	onSubmit(): void {
		this.selfserviceService.createPurchase(this.form.value)
			.subscribe({
				next: () => {
					this.utilsService.showSuccessMessage('Compra no self-service cadastrada com sucesso');
					this.form.reset();
				},
				error: (err) => this.utilsService.showErrorMessage(err.error.detail)
			});
	}
}
