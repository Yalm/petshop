import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { WelcomeComponent } from './views/welcome/welcome.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        children: [
            { path: '', component: WelcomeComponent, pathMatch: 'full' }
        ]
    },
    {
        path: '', component: AuthComponent,
        children: [
            { path: 'login', component: LoginComponent },
        ]
    },

    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
