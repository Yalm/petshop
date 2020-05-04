import { Component, Input } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { CartItem } from 'src/app/models/CartItem.model';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
    selector: 'app-qty',
    templateUrl: './qty.component.html',
    styleUrls: ['./qty.component.sass']
})
export class QtyComponent {

    @Input() product: CartItem;
    @Input() btn = true;
    @Input() quantity = 1;

    constructor(
        private shoppingCartService: ShoppingCartService,
        private dialog: MatDialog
    ) { }

    quantityUp(): void {
        if (this.quantity >= this.product.stock) {
            this.quantity = this.quantity;
        } else {
            this.quantity++;
        }
        this.updateItem();
    }

    quantityDown(): void {
        if (this.quantity <= 1) {
            this.quantity = this.quantity;
        } else {
            this.quantity--;
        }
        this.updateItem();
    }

    private updateItem(): void {
        if (!this.btn) {
            this.product.quantity = this.quantity;
            this.shoppingCartService.update(this.product);
        }
    }

    addCartProduct(): void {
        if (this.shoppingCartService.add({ quantity: this.quantity, ... this.product })) {
            this.dialog.open(AddProductComponent, {
                position: { top: '0' },
                autoFocus: false,
                data: this.product
            });
        }
    }
}
