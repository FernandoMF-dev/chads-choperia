import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteLinkUtils } from '../../utils/route-link.utils';
import { ReportLobbyComponent } from './pages/report-lobby/report-lobby.component';

const routes: Routes = [
	{
		path: '',
		component: ReportLobbyComponent
	},
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
