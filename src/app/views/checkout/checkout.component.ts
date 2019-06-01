import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { CulqiService } from 'src/app/services/culqi/culqi.service';
import { Order } from 'src/app/models/Order.model';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {
    public loading: boolean;
    public order: any;
    private token: string;
    public form: FormGroup;


    constructor(public shoppingCartService: ShoppingCartService,
        private culqiService: CulqiService,
        private orderService: OrderService) { }

    ngOnInit() {
        this.form = new FormGroup({
            culqi: new FormControl(null, Validators.required),
            plus_info: new FormControl({ value: null, disabled: this.loading }, [Validators.minLength(3), Validators.maxLength(250)]),
            method: new FormControl(null, Validators.required)
        });

        this.culqiService.Culqi.subscribe(data => {
            this.form.get('culqi').setValue(data);
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
        this.orderService.store(this.token, this.form.get('plus_info').value).subscribe(data => {
            this.loading = false;
            this.order = data;
        }, () => {
            this.loading = false;
        }
        );
    }
}
