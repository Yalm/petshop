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
    MatSelectModule
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
        MatCheckboxModule,
        MatSelectModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatTabsModule,
        MatCheckboxModule,
        MatSelectModule
    ],
    declarations: [],
})
export class MaterialModule { }
