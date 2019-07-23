import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    MatRadioModule,
    MatSelectModule,
    MatExpansionModule,
    MatChipsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
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
        MatRadioModule,
        MatSelectModule,
        MatExpansionModule,
        MatChipsModule,
        MatTableModule,
        MatSortModule
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatTabsModule,
        MatRadioModule,
        MatSelectModule,
        MatExpansionModule,
        MatChipsModule,
        MatTableModule,
        MatSortModule
    ],
    declarations: [],
})
export class MaterialModule { }
