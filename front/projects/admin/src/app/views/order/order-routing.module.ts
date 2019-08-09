import { Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { IdResolver } from '../../shared/resolvers/id-resolver.resolver';

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
        resolve: { order: IdResolver },
        data: {
            name: 'Editar pedido',
            back: '/orders',
            text: 'Detalle del pedido',
            path: 'orders'
        }
    }
];
