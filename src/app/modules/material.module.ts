import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatTabsModule,
    MatCheckboxModule,
} from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatTabsModule,
        MatCheckboxModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatTabsModule,
        MatCheckboxModule
    ],
    declarations: [],
})
export class MaterialModule { }
