import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { LoginComponent } from './views/login/login.component';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { environment } from '../environments/environment';
import { AuthComponent } from './layouts/auth/auth.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { SharedModule } from './modules/shared.module';
import { HeaderComponent } from './components/header/header.component';
// importar locales
import localeEsAr from '@angular/common/locales/es-AR';
import { MatPaginatorIntl } from '@angular/material';
import { MatPaginatorIntlCustom } from './shared/class/MatPaginatorIntlCustom';

// registrar los locales con el nombre que quieras utilizar a la hora de proveer
registerLocaleData(localeEsAr, 'es-PE');
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from 'src/app/interceptors/api.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LoginComponent,
        WelcomeComponent,
        AuthComponent,
        DashboardComponent,
        HeaderComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        SharedModule,
        Ng2UiAuthModule.forRoot({ providers: environment.providers, loginUrl: environment.loginUrl})
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'es-PE' },
        {
            provide: MatPaginatorIntl,
            useClass: MatPaginatorIntlCustom
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
