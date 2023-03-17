import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { BlocksComponent } from './blocks/blocks.component';
import { BlockViewerComponent } from './blockviewer/blockviewer.component';
import { PrimeBlocksRoutingModule } from './primeblocks-routing.module';

@NgModule({
	imports: [
		CommonModule,
		ButtonModule,
		RippleModule,
		ChipModule,
		CheckboxModule,
		FormsModule,
		InputTextModule,
		PasswordModule,
		TooltipModule,
		PrimeBlocksRoutingModule
	],
	declarations: [BlocksComponent, BlockViewerComponent]
})
export class PrimeBlocksModule {
}
