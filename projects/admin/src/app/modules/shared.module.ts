import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../modules/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InvalidMessageDirective } from 'src/app/directives/invalid-message/invalid-message.directive';
import { FallbackSrcDirective } from 'src/app/directives/fallback-src/fallback-src.directive';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { UploadComponent } from '../components/upload/upload.component';
import { DialogDeleteComponent } from '../components/dialog-delete/dialog-delete.component';
import { LoaderDirective } from '../directives/loader/loader.directive';
import { LoaderComponent } from '../components/loader/loader.component';
import { MatTableComponent } from '../components/mat-table/mat-table.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        FallbackSrcDirective,
        InvalidMessageDirective,
        BreadcrumbComponent,
        UploadComponent,
        DialogDeleteComponent,
        LoaderDirective,
        LoaderComponent,
        MatTableComponent
    ],
    exports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        FallbackSrcDirective,
        InvalidMessageDirective,
        BreadcrumbComponent,
        UploadComponent,
        LoaderDirective,
        LoaderComponent,
        MatTableComponent
    ],
    entryComponents: [
        LoaderComponent,
        DialogDeleteComponent
    ]
})
export class SharedModule { }
