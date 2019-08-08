import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { SharedModule } from '../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { CustomerRoutingModule } from './customer-routing.module';
import { MatTableModule } from '../../components/mat-table/mat-table.module';

@NgModule({
    declarations: [
        CustomerListComponent,
        CustomerEditComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(CustomerRoutingModule),
        MatTableModule
    ]
})
export class CustomerModule { }
