import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../modules/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InvalidMessageDirective } from 'src/app/directives/invalid-message/invalid-message.directive';
import { FallbackSrcDirective } from 'src/app/directives/fallback-src/fallback-src.directive';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { UploadComponent } from '../components/upload/upload.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        FallbackSrcDirective,
        InvalidMessageDirective,
        BreadcrumbComponent,
        UploadComponent
    ],
    exports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        FallbackSrcDirective,
        InvalidMessageDirective,
        BreadcrumbComponent,
        UploadComponent
    ]
})
export class SharedModule { }
