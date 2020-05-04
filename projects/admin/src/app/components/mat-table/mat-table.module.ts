import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableComponent } from './mat-table.component';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule as MaterialTableModule, } from '@angular/material/table';

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
