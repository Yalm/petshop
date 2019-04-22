import { Routes } from '@angular/router';

import { ProfileIndexComponent } from './profile-index/profile-index.component';
import { ProfileWelcomeComponent } from './profile-welcome/profile-welcome.component';

export const ProfileRoutingModule: Routes = [
    {
        path: 'profile', component: ProfileIndexComponent,
        children:
        [
            { path: '', component: ProfileWelcomeComponent },
        ]
    },
];

