import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportBeerConsumptionComponent } from './pages/report-beer-consumption/report-beer-consumption.component';

const routes: Routes = [
	{
		path: '',
		component: ReportBeerConsumptionComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportBeerConsumptionRoutingModule { }
