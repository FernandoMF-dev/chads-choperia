import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';

const routes: Routes = [
	{
		path: '', component: AppLayoutComponent,
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
				path: 'usuario',
				loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)
			},
			{
				path: 'produto',
				loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
			},
			{
				path: 'self-service',
				loadChildren: () => import('./modules/selfservice/selfservice.module').then(m => m.SelfserviceModule)
			},
			{
				path: 'cliente',
				loadChildren: () => import('./modules/client/client.module').then(m => m.ClientModule)
			},
			{
				path: 'chope',
				loadChildren: () => import('./modules/beer/beer.module').then(m => m.BeerModule)
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
		path: 'notfound',
		component: NotfoundComponent
	},
	{
		path: '**',
		redirectTo: '/notfound'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
