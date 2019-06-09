import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FallbackSrcDirective } from '../directives/fallback-src/fallback-src.directive';
import { InvalidMessageDirective } from '../directives/invalid-message/invalid-message.directive';
import { StateOrderPipe } from '../pipes/state-order.pipe';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ],
    declarations: [
        FallbackSrcDirective,
        InvalidMessageDirective,
        StateOrderPipe
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        FallbackSrcDirective,
        InvalidMessageDirective,
        StateOrderPipe
    ]
})
export class SharedModule { }
