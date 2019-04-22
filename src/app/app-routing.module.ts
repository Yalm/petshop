import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ShopComponent } from './views/shop/shop.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'shop', component: ShopComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
