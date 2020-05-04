import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { ShopComponent } from './shop.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductComponent } from 'src/app/components/product/product.component';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    declarations: [
        ShopComponent,
        ProductComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        MatIconModule,
        MatChipsModule,
        MatRadioModule,
        MatExpansionModule,
        MatPaginatorModule,
        RouterModule.forChild([
            { path: '', component: ShopComponent }
        ])
    ]
})
export class ShopModule { }
