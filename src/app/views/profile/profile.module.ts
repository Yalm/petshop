import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileIndexComponent } from './profile-index/profile-index.component';
import { ProfileWelcomeComponent } from './profile-welcome/profile-welcome.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { ProfileShowOrderComponent } from './profile-show-order/profile-show-order.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { SharedModule } from 'src/app/modules/shared.module';
import { MatTableModule, MatSortModule, MatInputModule } from '@angular/material';

@NgModule({
    declarations: [
        ProfileIndexComponent,
        ProfileWelcomeComponent,
        ProfileOrderComponent,
        ProfileShowOrderComponent,
        ProfileAccountComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(ProfileRoutingModule),
        SharedModule,
        MatInputModule,
        MatTableModule,
        MatSortModule
    ]
})
export class ProfileModule { }
