import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { Product } from 'src/app/models/Product.model';
import { PetDataSource } from '../../../shared/class/pet-datasource';
import { HttpClient } from '@angular/common/http';

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

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.dataSource = new PetDataSource(this.paginator, 'products', this.http, this.sort);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
