import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { CartItem } from 'src/app/models/CartItem.model';

@Component({
    selector: 'app-qty',
    templateUrl: './qty.component.html',
    styleUrls: ['./qty.component.sass']
})
export class QtyComponent {

    @Input() product: Product;
    @Input() btn: boolean = true;
    @Input() quantity: number = 1;

    constructor(private shoppingCartService: ShoppingCartService) { }

    quantityUp(): void {
        if (this.quantity >= this.product.stock) {
            this.quantity = this.quantity;
        } else {
            this.quantity++;
        }
        this.updated();
    }

    quantityDown(): void {
        if (this.quantity <= 1) {
            this.quantity = this.quantity;
        } else {
            this.quantity--;
        }
        this.updated();
    }

    addCartProduct(): void {
        this.shoppingCartService.add({ ...this.product, quantity: this.quantity });
    }

    private updated(): void {

    }
}
