import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportBeerConsumptionRoutingModule } from './report-beer-consumption-routing.module';
import { ReportBeerConsumptionComponent } from './pages/report-beer-consumption/report-beer-consumption.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import {RippleModule} from "primeng/ripple";


@NgModule({
  declarations: [
    ReportBeerConsumptionComponent
  ],
    imports: [
        CommonModule,
        ReportBeerConsumptionRoutingModule,
        ToastModule,
        ToolbarModule,
        CalendarModule,
        TableModule,
        FormsModule,
        RippleModule
    ]
})
export class ReportBeerConsumptionModule { }
