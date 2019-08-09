import { Component, OnInit } from '@angular/core';
import { MatColumn } from '../../../components/mat-table/column.model';
import { Params } from '@angular/router';

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.sass']
})
export class PurchasesComponent implements OnInit {

    columns: MatColumn[];
    params: Params;

    ngOnInit() {
        this.columns = [
            { name: 'id', colum_name: 'N° de pedido' },
            { name: 'customer', colum_name: 'Cliente' },
            { name: 'amount', colum_name: 'Monto' },
            { name: 'method', colum_name: 'Metodo de pago', class: 'd-none d-sm-table-cell' },
            { name: 'state', colum_name: 'Estado', class: 'd-none d-sm-table-cell' }
        ];
    }

}
