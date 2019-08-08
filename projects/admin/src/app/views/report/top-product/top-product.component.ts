import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { MatColumn } from '../../../components/mat-table/column.model';

@Component({
    selector: 'app-top-product',
    templateUrl: './top-product.component.html',
    styleUrls: ['./top-product.component.sass']
})
export class TopProductComponent implements OnInit {

    columns: MatColumn[];
    params: Params;

    ngOnInit() {
        this.columns = [
            { name: 'name', colum_name: 'Producto' },
            { name: 'quantity', colum_name: 'Cantidad' }
        ];
    }
}
