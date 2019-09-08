import { Component, OnInit } from '@angular/core';
import { MatColumn } from '../../../components/mat-table/column.model';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

    columns: MatColumn[];

    ngOnInit() {
        this.columns = [
            { name: 'name', colum_name: 'Nombre' },
            { name: 'price', colum_name: 'Precio', class: 'd-none d-sm-table-cell', prefix: 'S/ ', pipe: "number: '1.2-2'" },
            { name: 'stock', colum_name: 'Stock', class: 'd-none d-sm-table-cell' },
            {
                name: 'actions', link: {
                    icon: 'edit',
                    actionAndElement: (element) => ['/catalog/products', element.id, 'edit']
                }
            }
        ];
    }
}
