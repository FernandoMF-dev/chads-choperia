import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportRevenueComponent } from './pages/report-revenue/report-revenue.component';

const routes: Routes = [
  {
    path: '',
    component: ReportRevenueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRevenueRoutingModule { }
