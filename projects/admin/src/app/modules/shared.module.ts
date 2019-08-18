import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../modules/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InvalidMessageDirective } from '../directives/invalid-message/invalid-message.directive';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { UploadComponent } from '../components/upload/upload.component';
import { DialogDeleteComponent } from '../components/dialog-delete/dialog-delete.component';
import { LoaderDirective } from '../directives/loader/loader.directive';
import { LoaderComponent } from '../components/loader/loader.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        InvalidMessageDirective,
        BreadcrumbComponent,
        UploadComponent,
        DialogDeleteComponent,
        LoaderDirective,
        LoaderComponent
    ],
    exports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        InvalidMessageDirective,
        BreadcrumbComponent,
        UploadComponent,
        LoaderDirective,
        LoaderComponent
    ],
    entryComponents: [
        LoaderComponent,
        DialogDeleteComponent
    ]
})
export class SharedModule { }
