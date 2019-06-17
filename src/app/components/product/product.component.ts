import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/Product.model';
import { ShoppingCartService } from 'src/app/services/shopping-cart/shopping-cart.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

    @Input() product: Product;

    constructor(private shoppingCartService: ShoppingCartService,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit() {}

    addCartProduct() {
        if (this.product.stock > 0) {
            this.shoppingCartService.add({ ...this.product, quantity: 1 });
            this.snackBar.open('Su producto ha sido agregado.', 'Ok');
        }
    }
}
