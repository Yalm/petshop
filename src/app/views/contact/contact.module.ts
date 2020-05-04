import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';
import { ContactComponent } from './contact.component';
import { SharedModule } from 'src/app/modules/shared.module';

@NgModule({
    declarations: [
        ContactComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        SharedModule,
        RouterModule.forChild([
            { path: '', component: ContactComponent }
        ])
    ]
})
export class ContactModule { }
