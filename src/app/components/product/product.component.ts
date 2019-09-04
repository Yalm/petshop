import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { MatDialog } from '@angular/material';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.sass']
})
export class ProductComponent {

    @Input() product: Product;

    constructor(
        private shoppingCartService: ShoppingCartService,
        private dialog: MatDialog
    ) { }

    addCartProduct() {
        if (this.product.stock > 0) {
            this.shoppingCartService.add({ ...this.product, quantity: 1 });
            this.dialog.open(AddProductComponent, {
                position: { top: '0' },
                autoFocus: false,
                data: this.product
            });
        }
    }
}
