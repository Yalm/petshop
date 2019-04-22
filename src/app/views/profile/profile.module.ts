import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileIndexComponent } from './profile-index/profile-index.component';
import { ProfileWelcomeComponent } from './profile-welcome/profile-welcome.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
    declarations: [ProfileIndexComponent, ProfileWelcomeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ProfileRoutingModule)
    ]
})
export class ProfileModule { }
