import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { FooterComponent } from './components/footer/footer.component';

import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { SharedModule } from './modules/shared.module';
import { MegaMenuComponent } from './components/mega-menu/mega-menu.component';
import { LoaderComponent } from './components/loader/loader.component';

// importar locales
import localeEsPe from '@angular/common/locales/es-PE';
import { registerLocaleData } from '@angular/common';
// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEsPe, 'es-PE');
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getDutchPaginatorIntl } from './shared/class/MatPaginatorIntlCustom';
import { AddProductComponent } from './components/add-product/add-product.component';
import { BreadcrumbModule } from './components/breadcrumb/breadcrumb.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent,
        PageNotFoundComponent,
        MegaMenuComponent,
        LoaderComponent,
        AddProductComponent
    ],
    imports: [
        BreadcrumbModule,
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule,
        HttpClientModule,
        Ng2UiAuthModule.forRoot({ providers: environment.providers })
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'es-PE' },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiInterceptor,
        multi: true
    },
    {
        provide: MatPaginatorIntl,
        useValue: getDutchPaginatorIntl()
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
