import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Product } from 'src/app/models/Product.model';
import { PetDataSource } from '../../../shared/class/pet-datasource';
import { HttpClient } from '@angular/common/http';
import { DialogDeleteComponent } from '../../../components/dialog-delete/dialog-delete.component';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

    displayedColumns: string[] = ['name', 'price', 'stock', 'actions'];
    dataSource: PetDataSource<Product[]>;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private http: HttpClient,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.dataSource = new PetDataSource(this.paginator, 'products', this.http, this.sort);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    destroy(id: number) {
        this.dialog.open(DialogDeleteComponent, {
            width: '250px'
        }).afterClosed().subscribe((result: boolean) => {
            if (result) {
                this.dataSource.destroy(id);
            }
        });
    }
}
