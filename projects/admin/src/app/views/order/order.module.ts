import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { SharedModule } from '../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
    declarations: [
        OrderListComponent,
        OrderEditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(OrderRoutingModule)
    ]
})
export class OrderModule { }
