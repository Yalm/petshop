import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { Order } from 'src/app/models/Order.model';

@Component({
    selector: 'app-profile-show-order',
    templateUrl: './profile-show-order.component.html',
    styleUrls: ['./profile-show-order.component.sass']
})
export class ProfileShowOrderComponent implements OnInit {
    public order: Order;

    constructor(private route: ActivatedRoute,
        private orderService: OrderService,
        private router: Router) { }

    ngOnInit() {
        this.route.params.subscribe(param => {
            if (param.id) {
                this.orderService.show(param.id).subscribe(response => {
                    this.order = response;
                },err => {
                    this.router.navigateByUrl('404', { skipLocationChange: true });
                })
            } else {
                this.router.navigateByUrl('404', { skipLocationChange: true });
            }
        });
    }

}
