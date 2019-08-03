import { Routes } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryCreateComponent } from './category-create/category-create.component';

export const CategoryRoutingModule: Routes = [
    {
        path: '', component: CategoryListComponent,
        data: {
            icon: 'shopping_basket',
            name: 'Categorías'
        }
    },
    {
        path: 'create', component: CategoryCreateComponent,
        data: {
            name: 'Nuevo categoría',
            back: '/categories',
            text: 'Detalle de la categoría'
        }
    },
    {
        path: ':id/edit', component: CategoryEditComponent,
        data: {
            name: 'Editar categoría',
            back: '/categories',
            text: 'Detalle de la categoría'
        }
    }
];