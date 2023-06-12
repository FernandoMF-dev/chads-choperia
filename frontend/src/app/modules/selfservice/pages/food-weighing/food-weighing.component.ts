import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UtilsService } from "src/app/services/utils.service";
import { foodWeighingService } from "../../services/food-weighing.service";
import { ScaleService } from "src/app/services/scale.service";
@Component({
	selector: "app-food-weighing",
	templateUrl: "./food-weighing.component.html",
	styleUrls: ["./food-weighing.component.scss"],
})
export class FoodWeighingComponent {
	form: FormGroup;

	constructor(private utilsService: UtilsService, private foodWeighingService: foodWeighingService, private scaleService: ScaleService) {
		this.form = new FormGroup({
			cardId: new FormControl("", [Validators.required]),
			weight: new FormControl("", [Validators.required]),
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
		this.foodWeighingService.create(this.form.value).subscribe({
			next: () => {
				this.utilsService.showSuccessMessage("Self-service cadastrado com sucesso");
				this.form.reset();
			},
			error: () => {
				this.utilsService.showErrorMessage("Erro ao cadastrar");
			},
		});
	}
}
