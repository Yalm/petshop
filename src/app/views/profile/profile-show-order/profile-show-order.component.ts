import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/models/Order.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-profile-show-order',
    templateUrl: './profile-show-order.component.html',
    styleUrls: ['./profile-show-order.component.sass']
})
export class ProfileShowOrderComponent implements OnInit {
    order: Order;
    displayedColumns: string[] = ['name', 'id', 'price', 'quantity', 'subtotal'];
    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private route: ActivatedRoute,
        private orderService: OrderService,
        private router: Router) { }

    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.route.params.subscribe(param => {
            this.orderService.show(param.id).subscribe(response => {
                this.order = response;
                this.dataSource.data = this.order.products;
            }, () => {
                this.router.navigateByUrl('404', { skipLocationChange: true });
            });
        });
    }
}
