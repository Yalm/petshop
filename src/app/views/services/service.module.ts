import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';

@NgModule({
    declarations: [
        ServicesComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        RouterModule.forChild([
            { path: '', component: ServicesComponent }
        ])
    ]
})
export class ServiceModule { }
