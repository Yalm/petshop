import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { SharedModule } from '../../modules/shared.module';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { MatTableModule } from '../../components/mat-table/mat-table.module';

@NgModule({
    declarations: [
        UserListComponent,
        UserCreateComponent,
        UserEditComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(UserRoutingModule),
        SharedModule,
        MatTableModule
    ]
})
export class UserModule { }
