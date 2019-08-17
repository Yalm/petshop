import { NgModule } from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import {
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTabsModule,
    MatRadioModule,
    MatExpansionModule,
    MatChipsModule,
    MatPaginatorModule
} from '@angular/material';

@NgModule({
    exports: [
        A11yModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTabsModule,
        MatRadioModule,
        MatPaginatorModule,
        MatExpansionModule,
        MatChipsModule
    ],
    declarations: [],
})
export class MaterialModule { }
