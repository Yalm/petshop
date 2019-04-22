import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { EmailComponent } from './email/email.component';

import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
    declarations: [RegisterComponent, LoginComponent, ResetComponent, EmailComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(AuthRoutingModule),
        FormsModule,
        ReactiveFormsModule,
        AngularFireAuthModule
    ]
})
export class AuthModule { }
