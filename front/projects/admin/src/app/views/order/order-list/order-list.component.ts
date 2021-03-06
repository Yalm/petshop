import { Component, OnInit, ViewChild } from '@angular/core';
import { PetDataSource } from '../../../shared/class/pet-datasource';
import { MatSort, MatPaginator, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/Order.model';


@Component({
    selector: 'app-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.sass']
})
export class OrderListComponent implements OnInit {
    displayedColumns: string[] = ['id', 'created_at', 'state', 'amount', 'customer', 'actions'];
    dataSource: PetDataSource<Order[]>;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.dataSource = new PetDataSource(this.paginator, 'orders', this.http, this.sort);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
