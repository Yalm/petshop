import { Routes } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';

export const CustomerRoutingModule: Routes = [
    {
        path: '', component: CustomerListComponent,
        data: {
            icon: 'group',
            name: 'Clientes'
        }
    },
    {
        path: ':id/edit', component: CustomerEditComponent,
        data: {
            name: 'Editar cliente',
            back: '/customers',
            text: 'Detalle del cliente'
        }
    }
];
