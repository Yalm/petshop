import { Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';

export const OrderRoutingModule: Routes = [
    {
        path: '', component: OrderListComponent,
        data: {
            icon: 'shopping_basket',
            name: 'Pedidos'
        }
    },
    {
        path: ':id/edit', component: OrderEditComponent,
        data: {
            name: 'Editar pedido',
            back: '/orders',
            text: 'Detalle del pedido'
        }
    }
];
