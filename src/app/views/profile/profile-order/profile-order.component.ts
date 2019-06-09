import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/models/Order.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-profile-order',
    templateUrl: './profile-order.component.html',
    styleUrls: ['./profile-order.component.sass']
})
export class ProfileOrderComponent implements OnInit {

    public order: Observable< Order[]>;

    constructor(private orderService: OrderService) { }

    ngOnInit() {
        this.order = this.orderService.index();
    }
}
