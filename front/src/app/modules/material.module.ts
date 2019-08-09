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
    MatExpansionModule,
    MatChipsModule,
    MatPaginatorModule
} from '@angular/material';

@NgModule({
    exports: [
        A11yModule,
        MatInputModule,
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
