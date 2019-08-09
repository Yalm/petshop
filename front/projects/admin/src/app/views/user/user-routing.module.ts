import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { IdResolver } from '../../shared/resolvers/id-resolver.resolver';

export const UserRoutingModule: Routes = [
    {
        path: '', component: UserListComponent,
        data: {
            icon: 'contacts',
            name: 'Usuarios'
        }
    },
    {
        path: 'create', component: UserCreateComponent,
        data: {
            name: 'Nuevo usuario',
            back: '/users',
            text: 'Detalle del usuario'
        }
    },
    {
        path: ':id/edit', component: UserEditComponent,
        resolve: { user: IdResolver },
        data: {
            name: 'Editar usuario',
            back: '/users',
            text: 'Detalle del usuario',
            path: 'users'
        }
    }
];
