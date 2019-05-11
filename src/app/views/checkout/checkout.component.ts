import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/models/ShoppingCart.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { CulqiService } from 'src/app/services/culqi/culqi.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
    public cart: ShoppingCart = new ShoppingCart(null, []);
    public enabledCulqui: boolean = true;

    constructor(private shoppingCartService: ShoppingCartService,
        private culqiService: CulqiService,
        private orderService: OrderService) { }

    ngOnInit() {
        this.culqiService.Culqi.subscribe(data => {
            if(data.token) {
                this.checkout(data.token.id);
            }
        });
    }

    openCulqui(total: number) {
        this.culqiService.open(total);
    }

    private checkout(token: string) {
        this.orderService.store(token).subscribe(data => {
            console.log(data);
        });
    }
}
