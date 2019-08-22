import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { EmailComponent } from './email/email.component';
import { EmailVerifyComponent } from './email-verify/email-verify.component';
import { SharedModule } from 'src/app/modules/shared.module';
import { MatInputModule } from '@angular/material';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        ResetComponent,
        EmailComponent,
        EmailVerifyComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        RouterModule.forChild(AuthRoutingModule),
        SharedModule
    ]
})
export class AuthModule { }