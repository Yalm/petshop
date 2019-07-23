import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';
import { CategoryRoutingModule } from './category-routing.module';

@NgModule({
    declarations: [
        CategoryListComponent,
        CategoryEditComponent,
        CategoryCreateComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(CategoryRoutingModule),
        SharedModule
    ]
})
export class CategoryModule { }
