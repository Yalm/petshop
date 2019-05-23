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

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'p/:url', component: ShowProductComponent },
    { path: 'cart', component: CartComponent },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard, CartGuard] },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
