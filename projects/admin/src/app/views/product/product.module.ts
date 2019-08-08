import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../../modules/shared.module';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { MatTableModule } from '../../components/mat-table/mat-table.module';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductCreateComponent,
        ProductEditComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(ProductRoutingModule),
        SharedModule,
        MatTableModule
    ]
})
export class ProductModule { }
