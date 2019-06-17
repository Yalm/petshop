import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './views/home/home.component';
import { ShopComponent } from './views/shop/shop.component';
import { FooterComponent } from './components/footer/footer.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './views/auth/auth.module';

import { ProfileModule } from './views/profile/profile.module';
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
import { MaterialModule } from './modules/material.module';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MegaMenuComponent } from './components/mega-menu/mega-menu.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DocPipe } from './pipes/doc.pipe';

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
        DocPipe
    ],
    imports: [
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        MaterialModule,
        SharedModule,
        AngularFireAuthModule,
        AngularFirestoreModule,
        AuthModule,
        ProfileModule,
        AppRoutingModule,
        HttpClientModule,
        MatCarouselModule,
        AngularFireStorageModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
