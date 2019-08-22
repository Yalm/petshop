import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { ShopComponent } from './views/shop/shop.component';
import { FooterComponent } from './components/footer/footer.component';

import { environment } from '../environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ProductComponent } from './components/product/product.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

import { ShowProductComponent } from './views/show-product/show-product.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { QtyComponent } from './components/qty/qty.component';
import { CartComponent } from './views/cart/cart.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { SharedModule } from './modules/shared.module';
import { AboutComponent } from './views/about/about.component';
import { ServicesComponent } from './views/services/services.component';
import { ContactComponent } from './views/contact/contact.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MegaMenuComponent } from './components/mega-menu/mega-menu.component';
import { LoaderComponent } from './components/loader/loader.component';

// importar locales
import localeEsAr from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEsAr, 'es-PE');
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlCustom } from './shared/class/MatPaginatorIntlCustom';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        ShopComponent,
        FooterComponent,
        ProductComponent,
        BreadcrumbComponent,
        ShowProductComponent,
        PageNotFoundComponent,
        QtyComponent,
        CartComponent,
        CheckoutComponent,
        AboutComponent,
        ServicesComponent,
        ContactComponent,
        MegaMenuComponent,
        LoaderComponent
    ],
    imports: [
        BrowserAnimationsModule,
        SharedModule,
        AppRoutingModule,
        HttpClientModule,
        MatCarouselModule,
        Ng2UiAuthModule.forRoot({ providers: environment.providers })
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'es-PE' },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ApiInterceptor,
        multi: true,
    },
    {
        provide: MatPaginatorIntl,
        useClass: MatPaginatorIntlCustom
    }],
    bootstrap: [AppComponent]
})
export class AppModule { }
