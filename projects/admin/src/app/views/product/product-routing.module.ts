import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

export const ProductRoutingModule: Routes = [
    {
        path: '', component: ProductListComponent,
        data: {
            icon: 'shopping_basket',
            name: 'Productos'
        }
    },
    {
        path: 'create', component: ProductCreateComponent,
        data: {
            name: 'Nuevo Producto',
            back: '/products',
            text: 'Detalle del producto'
        }
    },
    {
        path: ':id/edit', component: ProductEditComponent,
        data: {
            name: 'Editar Producto',
            back: '/products',
            text: 'Detalle del producto'
        }
    }
];
