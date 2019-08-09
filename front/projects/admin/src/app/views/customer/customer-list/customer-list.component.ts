import { Component, OnInit } from '@angular/core';
import { MatColumn } from '../../../components/mat-table/column.model';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.sass']
})
export class CustomerListComponent implements OnInit {

    columns: MatColumn[];

    ngOnInit() {
        this.columns = [
            { name: 'name', colum_name: 'Nombre' },
            { name: 'surnames', colum_name: 'Apellidos', class: 'd-none d-sm-table-cell' },
            { name: 'email', colum_name: 'Correo', class: 'd-none d-sm-table-cell' },
            { name: 'orders_count', colum_name: 'Pedidos', class: 'd-none d-sm-table-cell' },
            {
                name: 'actions', link: {
                    icon: 'edit',
                    actionAndElement: (element) => ['/customers', element.id, 'edit']
                }
            }
        ];
    }
}
