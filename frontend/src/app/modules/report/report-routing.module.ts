import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteLinkUtils } from '../../utils/route-link.utils';

const routes: Routes = [
	{
		path: RouteLinkUtils.BEER,
		loadChildren: () => import('./modules/report-beer/report-beer.module').then(m => m.ReportBeerModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportRoutingModule {
}
