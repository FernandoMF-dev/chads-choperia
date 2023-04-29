import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodWeighingComponent } from './food-weighing.component';

describe('FoodWeighingComponent', () => {
	let component: FoodWeighingComponent;
	let fixture: ComponentFixture<FoodWeighingComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FoodWeighingComponent]
		})
			.compileComponents();

		fixture = TestBed.createComponent(FoodWeighingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
