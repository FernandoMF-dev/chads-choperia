import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './layout/service/auth/AuthGuard';
import { RolesUtil } from './utils/RolesUtil';
import { RouteLinkUtils } from './utils/route-link.utils';

const routes: Routes = [
	{
		path: '',
		component: AppLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: 'uikit',
				loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule)
			},
			{
				path: 'utilities',
				loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule)
			},
			{
				path: 'documentation',
				loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule)
			},
			{
				path: 'blocks',
				loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule)
			},
			{
				path: 'pages',
				loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule)
			},
			{
				path: RouteLinkUtils.USER,
				loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
				canActivate: [AuthGuard],
				data: {roles: [RolesUtil.ADMIN]}
			},
			{
				path: RouteLinkUtils.PRODUCT,
				loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
			},
			{
				path: RouteLinkUtils.SELF_SERVICE,
				loadChildren: () => import('./modules/selfservice/selfservice.module').then(m => m.SelfserviceModule)
			},
			{
				path: RouteLinkUtils.CLIENTE,
				loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule),
				data: {roles: [RolesUtil.COSTUMER_MONITOR]},
				canActivate: [AuthGuard],
			},
			{
				path: RouteLinkUtils.BEER,
				loadChildren: () => import('./modules/beer/beer.module').then(m => m.BeerModule)
			},
			{
				path: RouteLinkUtils.CARD,
				loadChildren: () => import('./modules/card/card.module').then(m => m.CardModule)
			},
			{
				path: RouteLinkUtils.REPORT,
				loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule),
				data: {roles: [RolesUtil.ADMIN]},
				canActivate: [AuthGuard],
			},
			{
				path: RouteLinkUtils.EMAIL,
				loadChildren: () => import('./modules/email/email.module').then(m => m.EmailModule),
				data: {roles: [RolesUtil.ADMIN]},
				canActivate: [AuthGuard],
			}
		]
	},
	{
		path: 'auth',
		loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)
	},
	{
		path: 'landing',
		loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule)
	},
	{
		path: RouteLinkUtils.NOT_FOUND,
		component: NotfoundComponent
	},
	{
		path: '**',
		redirectTo: RouteLinkUtils.NOT_FOUND
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {
}
