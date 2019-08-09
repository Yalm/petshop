import { Routes } from '@angular/router';
import { ProfileIndexComponent } from './profile-index/profile-index.component';
import { ProfileWelcomeComponent } from './profile-welcome/profile-welcome.component';
import { ProfileOrderComponent } from './profile-order/profile-order.component';
import { ProfileShowOrderComponent } from './profile-show-order/profile-show-order.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';

export const ProfileRoutingModule: Routes = [
    {
        path: 'profile', component: ProfileIndexComponent,
        children:
            [
                { path: '', component: ProfileWelcomeComponent },
                { path: 'orders', component: ProfileOrderComponent },
                { path: 'account', component: ProfileAccountComponent },
                { path: 'orders/:id', component: ProfileShowOrderComponent }
            ]
    }
];

