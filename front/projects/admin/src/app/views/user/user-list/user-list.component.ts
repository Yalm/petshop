import { Component, OnInit } from '@angular/core';
import { MatColumn } from '../../../components/mat-table/column.model';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

    columns: MatColumn[];

    ngOnInit() {
        this.columns = [
            { name: 'name', colum_name: 'Nombre' },
            { name: 'email', colum_name: 'Correo', class: 'd-none d-sm-table-cell' },
            { name: 'actived', colum_name: 'Activo', class: 'd-none d-sm-table-cell' },
            {
                name: 'actions', link: {
                    icon: 'edit',
                    actionAndElement: (element) => ['/users', element.id, 'edit']
                }
            }
        ];
    }
}
