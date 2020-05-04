import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from 'src/app/modules/shared.module';

@NgModule({
    declarations: [
        CheckoutComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        SharedModule,
        RouterModule.forChild([
            { path: '', component: CheckoutComponent }
        ])
    ]
})
export class CheckoutModule { }
