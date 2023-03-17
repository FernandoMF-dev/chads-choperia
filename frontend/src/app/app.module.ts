import { DatePipe, HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ThermalPrintModule } from 'ng-thermal-print';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { ProductService } from './demo/service/product.service';
import { AppLayoutModule } from './layout/app.layout.module';
import { UtilsService } from './services/utils.service';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        ThermalPrintModule
    ],
    providers: [
		{ provide: LocationStrategy, useClass: HashLocationStrategy },
		CountryService, CustomerService, EventService, IconService, NodeService,
		PhotoService, ProductService, MessageService, DatePipe, UtilsService,
		{ provide: LOCALE_ID, useValue: 'pt-BR' }
	],
    bootstrap: [AppComponent]
})
export class AppModule { }
