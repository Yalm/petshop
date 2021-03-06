import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { EmailComponent } from './email/email.component';
import { CheckLoginGuard } from './guards/auth/check-login.guard';
import { VerifyResolver } from 'src/app/resolvers/verify-resolver.resolver';

export const AuthRoutingModule: Routes = [
    { path: 'register', component: RegisterComponent, canActivate: [CheckLoginGuard] },
    { path: 'login', component: LoginComponent, canActivate: [CheckLoginGuard] },
    { path: 'password/reset', component: ResetComponent, canActivate: [CheckLoginGuard] },
    { path: 'password/email', component: EmailComponent, canActivate: [CheckLoginGuard] },
    {
        path: 'email/verify/:token', component: LoginComponent, canActivate: [CheckLoginGuard],
        resolve: { verify: VerifyResolver }
    }
];

