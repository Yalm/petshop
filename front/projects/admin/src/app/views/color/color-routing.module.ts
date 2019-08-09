import { Routes } from '@angular/router';
import { ColorListComponent } from './color-list/color-list.component';

export const ColorRoutingModule: Routes = [
    {
        path: '', component: ColorListComponent,
        data: {
            icon: 'format_color_fill',
            name: 'Colores'
        }
    }
];
