import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { SharedModule } from '../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { OrderRoutingModule } from './order-routing.module';
import { ShippingPipe } from '../../pipes/shipping.pipe';
import { OrderIconPipe } from '../../pipes/order-icon.pipe';
import { PaymentCreateComponent } from './payment-create/payment-create.component';

@NgModule({
    declarations: [
        OrderListComponent,
        OrderEditComponent,
        ShippingPipe,
        OrderIconPipe,
        PaymentCreateComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(OrderRoutingModule)
    ],
    entryComponents: [PaymentCreateComponent]
})
export class OrderModule { }
