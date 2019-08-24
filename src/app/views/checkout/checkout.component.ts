import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { CulqiService } from 'src/app/services/culqi/culqi.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit, OnDestroy {

    order: { items: any[], total: number };
    form: FormGroup;
    subscription: Subscription;

    constructor(public shoppingCartService: ShoppingCartService,
        private culqi: CulqiService,
        private snackBar: MatSnackBar,
        private orderService: OrderService) { }

    ngOnInit() {
        this.form = new FormGroup({
            culqi_token: new FormControl(null),
            email: new FormControl(null, Validators.email),
            plus_info: new FormControl(null, [Validators.minLength(3), Validators.maxLength(250)]),
            method: new FormControl(null, Validators.required)
        });

        this.subscription = this.culqi.token.subscribe(token => {
            if (token.id) {
                this.form.get('culqi_token').setValue(token.id);
                this.form.get('email').setValue(token.email);
                this.checkout();
            } else {
                this.snackBar.open(token['user_message'], 'Ok', {
                    duration: 5000,
                    panelClass: ['bg-danger', 'text-white']
                });
            }
        });
    }

    openCulqui(total: number) {
        if (this.form.get('method').value == 'credit_card') {
            this.culqi.open({
                amount: total,
                title: 'Pet Shop',
                currency: 'PEN',
                description: 'Petshop Veterinaria Huancayo'
            });
        } else {
            this.checkout();
        }
    }

    private checkout() {
        this.orderService.store(this.form.value).subscribe(() => {
            this.order = {
                items: this.shoppingCartService.cart_init.items,
                total: this.shoppingCartService.cart_init.totalCart()
            }
            this.shoppingCartService.reset();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}