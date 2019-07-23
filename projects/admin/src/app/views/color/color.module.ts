import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorListComponent } from './color-list/color-list.component';
import { ColorCreateComponent } from './color-create/color-create.component';
import { ColorEditComponent } from './color-edit/color-edit.component';
import { SharedModule } from '../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { ColorRoutingModule } from './color-routing.module';

@NgModule({
    declarations: [ColorListComponent, ColorCreateComponent, ColorEditComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ColorRoutingModule),
        SharedModule
    ],
    entryComponents: [ColorCreateComponent, ColorEditComponent]
})
export class ColorModule { }
