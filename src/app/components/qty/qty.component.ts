import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { CartItem } from 'src/app/models/CartItem.model';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-qty',
    templateUrl: './qty.component.html',
    styleUrls: ['./qty.component.sass']
})
export class QtyComponent {

    @Output() changeQty = new EventEmitter();
    @Input() product: CartItem;
    @Input() btn: boolean = true;
    @Input() quantity: number = 1;

    public loading: boolean;

    constructor(private shoppingCartService: ShoppingCartService,
        private snackBar: MatSnackBar,
        ) { }

    quantityUp(): void {
        if (this.quantity >= this.product.stock) {
            this.quantity = this.quantity;
        } else {
            this.quantity++;
            this.changeQty.emit(this.quantity);
        }
    }

    quantityDown(): void {
        if (this.quantity <= 1) {
            this.quantity = this.quantity;
        } else {
            this.quantity--;
            this.changeQty.emit(this.quantity);
        }
    }

    addCartProduct(): void {
        this.loading = true;

        this.shoppingCartService.add({ ...this.product, quantity: this.quantity })
            .then(() => {
                this.snackBar.open('Su producto ha sido agregado.', 'Ok');
                this.loading = false;
            });
    }
}
