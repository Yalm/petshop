import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { CustomerService } from '../../services/customer/customer.service';
import { OrderService } from '../../services/order/order.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.sass']
})
export class WelcomeComponent implements OnInit {

    countOrder: Observable<number>;
    countProduct: Observable<number>;
    countCustomer: Observable<number>;

    constructor(
        private order: OrderService,
        private product: ProductService,
        private customer: CustomerService) { }

    ngOnInit() {
        this.countOrder = this.order.count();
        this.countProduct = this.product.count();
        this.countCustomer = this.customer.count();
    }
}
