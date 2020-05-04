import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { CartComponent } from './cart.component';
import { QtyModule } from 'src/app/components/qty/qty.module';

@NgModule({
    declarations: [
        CartComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        QtyModule,
        RouterModule.forChild([
            { path: '', component: CartComponent }
        ])
    ]
})
export class CartModule { }
