import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { CulqiService } from 'src/app/services/culqi/culqi.service';
import { Order } from 'src/app/models/Order.model';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
    public plus_info: string = '';
    private token: string;
    public loading: boolean;
    public order: Order;

    constructor(private shoppingCartService: ShoppingCartService,
        private culqiService: CulqiService,
        private orderService: OrderService) { }

    ngOnInit() {
        this.culqiService.Culqi.subscribe(data => {
            if (data.token) {
                this.checkout(data.token.id);
            }
        });
    }

    openCulqui(total: number) {
        if (this.token) this.checkout(this.token);
        else this.culqiService.open(total);
    }

    private checkout(token: string) {
        this.token = token != this.token ? token : this.token;
        this.loading = true;
        this.orderService.store(this.token, this.plus_info).subscribe(data => {
            this.loading = false;
            this.order = data;
        }, () => {
            this.loading = false;
        }
        );
    }
}
