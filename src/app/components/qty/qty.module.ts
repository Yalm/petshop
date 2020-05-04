import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QtyComponent } from './qty.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        QtyComponent
    ],
    exports: [
        QtyComponent
    ]
})
export class QtyModule { }
