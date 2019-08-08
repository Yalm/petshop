import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableComponent } from './mat-table.component';
import { RouterModule } from '@angular/router';
import {
    MatTableModule as MaterialTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule
} from '@angular/material';

@NgModule({
    declarations: [
        MatTableComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MaterialTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatIconModule,
        RouterModule,
        MatInputModule
    ],
    exports: [MatTableComponent]
})
export class MatTableModule { }
