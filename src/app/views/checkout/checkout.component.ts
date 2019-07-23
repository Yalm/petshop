import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { CulqiService } from 'src/app/services/culqi/culqi.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit, OnDestroy {
    loading: boolean;
    order: any;
    form: FormGroup;
    subscription: Subscription;

    constructor(public shoppingCartService: ShoppingCartService,
        private culqi: CulqiService,
        private orderService: OrderService) { }

    ngOnInit() {
        this.form = new FormGroup({
            culqi_token: new FormControl(null),
            email: new FormControl(null, Validators.email),
            plus_info: new FormControl({ value: null, disabled: this.loading }, [Validators.minLength(3), Validators.maxLength(250)]),
            method: new FormControl(null, Validators.required)
        });

        this.loading = true;
        this.culqi.initCulqi().then(() => {
            this.loading = false;
        });

        this.subscription = this.culqi.token.subscribe(token => {
            this.form.get('culqi_token').setValue(token.id);
            this.form.get('email').setValue(token.email);
            this.checkout();
        });
    }

    openCulqui(total: number) {
        this.culqi.open({
            amount: total,
            title: 'Pet Shop',
            currency: 'PEN',
            description: 'Petshop Veterinaria Huancayo'
        });
    }

    private checkout() {
        this.loading = true;
        this.orderService.store(this.form.value).subscribe(data => {
            this.loading = false;
            this.order = data;
            this.order.items = this.shoppingCartService.cart_init.items;
            this.order.total = this.shoppingCartService.cart_init.totalCart();
            this.shoppingCartService.update([]);
        }, () => this.loading = false);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
