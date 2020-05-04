import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShowProductComponent } from './show-product.component';
import { QtyModule } from 'src/app/components/qty/qty.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    declarations: [
        ShowProductComponent
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        QtyModule,
        RouterModule.forChild([
            { path: '', component: ShowProductComponent }
        ])
    ]
})
export class ShowProductModule { }
