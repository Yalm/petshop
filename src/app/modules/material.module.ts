import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
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
    exports: [
        A11yModule,
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
