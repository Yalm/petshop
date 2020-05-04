import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { CartGuard } from './guards/cart/cart.guard';
import { AuthGuard } from './views/auth/guards/auth/auth.guard';
import { CompleteInfoGuard } from './views/auth/guards/complete-info/complete-info.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'shop',
        loadChildren: () => import('./views/shop/shop.module').then(m => m.ShopModule)
    },
    {
        path: 'about',
        loadChildren: () => import('./views/about/about.module').then(m => m.AboutModule)
    },
    {
        path: 'services',
        loadChildren: () => import('./views/services/service.module').then(m => m.ServiceModule)
    },
    {
        path: 'contact',
        loadChildren: () => import('./views/contact/contact.module').then(m => m.ContactModule)
    },
    {
        path: 'p/:url',
        loadChildren: () => import('./views/show-product/show-product.module').then(m => m.ShowProductModule)
    },
    {
        path: 'cart',
        loadChildren: () => import('./views/cart/cart.module').then(m => m.CartModule)
    },
    {
        path: 'checkout', canActivate: [AuthGuard, CartGuard, CompleteInfoGuard],
        loadChildren: () => import('./views/checkout/checkout.module').then(m => m.CheckoutModule)
    },
    {
        path: '', canActivate: [AuthGuard],
        loadChildren: () => import('./views/profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: '', loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
