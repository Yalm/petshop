import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../modules/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InvalidMessageDirective } from 'src/app/directives/invalid-message/invalid-message.directive';
import { FallbackSrcDirective } from 'src/app/directives/fallback-src/fallback-src.directive';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    declarations: [
        FallbackSrcDirective,
        InvalidMessageDirective
    ],
    exports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        FallbackSrcDirective,
        InvalidMessageDirective
    ]
})
export class SharedModule { }
