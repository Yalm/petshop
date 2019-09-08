import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { CulqiService } from 'src/app/services/culqi/culqi.service';
import { Validators, FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { UbigeosService } from 'src/app/services/ubigeos/ubigeos.service';
import { switchMap, tap } from 'rxjs/operators';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit, OnDestroy {

    order: { items: any[], subtotal: number, total: number, shipping: number };
    form: FormGroup;
    subscription: Subscription;
    departments: Observable<any[]>;
    provinces: Observable<any[]>;
    districts: Observable<any[]>;

    constructor(
        public shoppingCartService: ShoppingCartService,
        private culqi: CulqiService,
        private snackBar: MatSnackBar,
        private ubigueo: UbigeosService,
        private orderService: OrderService) { }

    ngOnInit() {
        this.form = new FormGroup({
            culqi_token: new FormControl(null),
            email: new FormControl(null, Validators.email),
            plus_info: new FormControl(null, [Validators.minLength(3), Validators.maxLength(250)]),
            method: new FormControl(null, Validators.required),
            shipping: new FormControl(true),
            department: new FormControl(null, Validators.required),
            province: new FormControl(null, Validators.required)
        });

        this.departments = this.ubigueo.departments();

        this.provinces = this.form.get('department').valueChanges.pipe(
            tap(department => this.shoppingCartService.shipping(department === '3655' ? 10 : 30)),
            switchMap(department => this.ubigueo.provinces(department))
        );

        this.subscription = this.culqi.token.subscribe(token => {
            if (token.id) {
                this.form.get('culqi_token').setValue(token.id);
                this.form.get('email').setValue(token.email);
                this.checkout();
            } else {
                this.snackBar.open(token.user_message, 'Ok', {
                    duration: 5000,
                    panelClass: ['bg-danger', 'text-white']
                });
            }
        });
    }

    openCulqui(): void {
        if (this.form.get('method').value === 'credit_card') {
            this.culqi.open({
                amount: this.shoppingCartService.cartInit.totalCart(),
                title: 'Pet Shop',
                currency: 'PEN',
                description: 'Petshop Veterinaria Huancayo'
            });
        } else {
            this.checkout();
        }
    }

    private checkout(): void {
        this.orderService.store(this.form.value).subscribe(() => {
            this.order = {
                items: this.shoppingCartService.cartInit.items,
                subtotal: this.shoppingCartService.cartInit.subtotal,
                shipping: this.shoppingCartService.cartInit.shipping,
                total: this.shoppingCartService.cartInit.totalCart()
            };
            this.shoppingCartService.reset();
        });
    }

    shipping(index: number): void {
        if (index === 0) {
            this.shoppingCartService.shipping(this.form.get('department').value === '3655' ? 5 : 20);
            this.form.get('shipping').setValue(true);

            this.deleteOrAddValidate(Validators.required);
        } else {
            this.form.get('shipping').setValue(false);
            this.deleteOrAddValidate();
            this.shoppingCartService.shipping(0);
        }
    }

    private deleteOrAddValidate(validators?: ValidatorFn | ValidatorFn[]): void {
        const items = ['department', 'province'];
        for (const key of items) {
            if (validators) {
                this.form.get(key).setValidators(validators);
                this.form.get(key).updateValueAndValidity();
            } else {
                this.form.get(key).clearValidators();
                this.form.get(key).updateValueAndValidity();
            }
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
