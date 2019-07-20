import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/views/auth/models/customer';
import { PetDataSource } from '../../../shared/class/pet-datasource';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.sass']
})
export class CustomerListComponent implements OnInit {

    displayedColumns: string[] = ['name', 'surnames', 'email', 'orders_count', 'actions'];
    dataSource: PetDataSource<Customer[]>;

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private http: HttpClient,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.dataSource = new PetDataSource(this.paginator, 'customers', this.http, this.sort);
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    destroy(id: number) {
        this.dataSource.destroy(id);
    }
}
