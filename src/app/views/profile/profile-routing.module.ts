import { Routes } from '@angular/router';

import { ProfileIndexComponent } from './profile-index/profile-index.component';
import { ProfileWelcomeComponent } from './profile-welcome/profile-welcome.component';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { AuthGuard } from '../auth/guards/auth/auth.guard';

export const ProfileRoutingModule: Routes = [
    {
        path: 'profile', component: ProfileIndexComponent, canActivate: [AuthGuard],
        children:
            [
                { path: '', component: ProfileWelcomeComponent },
                { path: 'orders', component: ProfileOrderComponent },
            ]
    },
];

