import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UtilsService } from "src/app/services/utils.service";
import { SelfserviceService } from "../../services/selfservice.service";
import { ScaleService } from "src/app/services/scale.service";
import { Subscription, interval } from "rxjs";

@Component({
	selector: "app-food-weighing",
	templateUrl: "./food-weighing.component.html",
	styleUrls: ["./food-weighing.component.scss"],
})
export class FoodWeighingComponent implements OnDestroy {
	form: FormGroup;
	autoFetch: Subscription;
	private static readonly REFRESH_RATE_TIME: number = 1000 * 1;

	constructor(private utilsService: UtilsService, private selfserviceService: SelfserviceService, private scaleService: ScaleService) {
		this.form = new FormGroup({
			cardRfid: new FormControl("", [Validators.required]),
			weight: new FormControl("", [Validators.required]),
		});

		this.autoFetch = this.autoFetchNotifications();
	}

	ngOnDestroy(): void {
		this.stopRefreshWeightThread();
	}

	private autoFetchNotifications(): Subscription {
		return interval(FoodWeighingComponent.REFRESH_RATE_TIME).subscribe(() => {
			this.stopRefreshWeightThread();
			this.scaleService.getWeight().subscribe({
				next: (weight) => {
					this.form.get("weight")?.setValue(weight.lastWeight);
					this.autoFetch = this.autoFetchNotifications();
				},
				error: () => {
					this.stopRefreshWeightThread();
				}
			});
		});
	}

	private stopRefreshWeightThread(): void {
		this.autoFetch.unsubscribe();
	}

	isFieldValid(fieldName: string): boolean {
		return this.utilsService.isFieldValid(this.form, fieldName);
	}

	onSubmit(): void {
		this.selfserviceService.createPurchase(this.form.value).subscribe({
			next: () => {
				this.utilsService.showSuccessMessage("Compra no self-service cadastrada com sucesso");
				this.form.reset();
			},
			error: (err) => this.utilsService.showErrorMessage(err.error.detail),
		});
	}
}
