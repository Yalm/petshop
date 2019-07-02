import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/models/Order.model';
import { MatPaginator } from '@angular/material';
import { PetDataSource } from 'projects/admin/src/app/shared/class/pet-datasource';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-profile-order',
    templateUrl: './profile-order.component.html',
    styleUrls: ['./profile-order.component.sass']
})
export class ProfileOrderComponent implements OnInit {

    dataSource: PetDataSource<Order[]>;
    displayedColumns: string[] = ['id', 'created_at', 'amount'];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private http: HttpClient) { }

    ngOnInit() {
        this.dataSource = new PetDataSource(this.paginator, 'orders',this.http);
    }
}
