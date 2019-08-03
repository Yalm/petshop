import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ShopComponent } from './views/shop/shop.component';
import { ShowProductComponent } from './views/show-product/show-product.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { CartComponent } from './views/cart/cart.component';
import { CheckoutComponent } from './views/checkout/checkout.component';
import { CartGuard } from './guards/cart/cart.guard';
import { AuthGuard } from './views/auth/guards/auth/auth.guard';
import { AboutComponent } from './views/about/about.component';
import { ContactComponent } from './views/contact/contact.component';
import { ServicesComponent } from './views/services/services.component';
import { VerifyResolver } from './resolvers/verify-resolver.resolver';

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        data: { transparent: true }
    },
    { path: 'shop', component: ShopComponent },
    { path: 'about', component: AboutComponent, },
    { path: 'services', component: ServicesComponent },
    {
        path: 'email/verify/:token', component: PageNotFoundComponent,
        resolve: { verify: VerifyResolver }
    },
    { path: 'contact', component: ContactComponent },
    { path: 'p/:url', component: ShowProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard, CartGuard] },
    { path: '404', component: PageNotFoundComponent },

    {
        path: 'profile', loadChildren: () => {
            return import('./views/profile/profile.module').then(m => m.ProfileModule)
        }
    },

    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
