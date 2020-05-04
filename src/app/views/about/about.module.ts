import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';

@NgModule({
    declarations: [
        AboutComponent
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        RouterModule.forChild([
            { path: '', component: AboutComponent }
        ])
    ]
})
export class AboutModule { }
