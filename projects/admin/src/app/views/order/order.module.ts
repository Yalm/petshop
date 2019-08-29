import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { SharedModule } from '../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { OrderRoutingModule } from './order-routing.module';
import { ShippingPipe } from '../../pipes/shipping.pipe';

@NgModule({
    declarations: [
        OrderListComponent,
        OrderEditComponent,
        ShippingPipe
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(OrderRoutingModule)
    ]
})
export class OrderModule { }
