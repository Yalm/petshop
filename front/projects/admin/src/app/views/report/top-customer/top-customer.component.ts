import { Component, OnInit } from '@angular/core';
import { MatColumn } from '../../../components/mat-table/column.model';
import { Params } from '@angular/router';

@Component({
    selector: 'app-top-customer',
    templateUrl: './top-customer.component.html',
    styleUrls: ['./top-customer.component.sass']
})
export class TopCustomerComponent implements OnInit {

    columns: MatColumn[];
    params: Params;

    ngOnInit() {
        this.columns = [
            { name: 'name', colum_name: 'Nombre' },
            { name: 'surnames', colum_name: 'Apellidos', class: 'd-none d-sm-table-cell' },
            { name: 'email', colum_name: 'Correo', class: 'd-none d-sm-table-cell' },
            { name: 'phone', colum_name: 'Celular', class: 'd-none d-sm-table-cell' },
            { name: 'purchases', colum_name: 'Compras' }
        ];
    }
}
