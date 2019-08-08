import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { LoginComponent } from './views/auth/login/login.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { CheckLoginGuard } from './guards/auth/check-login.guard';
import { CatalogComponent } from './views/catalog/catalog.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { ResetComponent } from './views/auth/reset/reset.component';
import { EmailComponent } from './views/auth/email/email.component';
import { ProfileComponent } from './views/profile/profile.component';


const routes: Routes = [
    {
        path: '', component: DashboardComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: WelcomeComponent, pathMatch: 'full' },
            { path: 'profile', component: ProfileComponent },
            {
                path: 'catalog', component: CatalogComponent,
                data: {
                    icon: 'store',
                    name: 'Catálogo'
                }
            },
            {
                path: 'products',
                loadChildren: () => import('./views/product/product.module').then(m => m.ProductModule)
            },
            {
                path: 'categories',
                loadChildren: () => import('./views/category/category.module').then(m => m.CategoryModule)
            },
            {
                path: 'colors',
                loadChildren: () => import('./views/color/color.module').then(m => m.ColorModule)
            },
            {
                path: 'customers',
                loadChildren: () => import('./views/customer/customer.module').then(m => m.CustomerModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)
            },
            {
                path: 'orders',
                loadChildren: () => import('./views/order/order.module').then(m => m.OrderModule)
            },
            {
                path: 'reports',
                loadChildren: () => import('./views/report/report.module').then(m => m.ReportModule)
            }
        ]
    },
    {
        path: '', component: AuthComponent, canActivate: [CheckLoginGuard],
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'password/reset', component: ResetComponent },
            { path: 'password/email', component: EmailComponent }
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
