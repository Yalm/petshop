import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator } from '@angular/material';
import { FirestoreDataSource } from './product-list-datasource';
import { Product } from 'src/app/models/Product.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {

    displayedColumns: string[] = ['show', 'name', 'price', 'stock', 'actions'];
    dataSource: FirestoreDataSource<Product>;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private afs: AngularFirestore) { }

    ngOnInit() {
        this.dataSource = new FirestoreDataSource(this.paginator, this.afs, 'products',this.sort);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
